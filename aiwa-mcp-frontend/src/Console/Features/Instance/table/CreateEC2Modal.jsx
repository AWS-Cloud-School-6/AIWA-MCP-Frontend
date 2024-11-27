import React, { useState, useEffect } from 'react';
import { useNotification } from '../../NotificationContext';
import styles from './CreateEC2Modal.module.css';
import { useUserContext } from '../../../../UserContext';
import { NotificationManager } from 'react-notifications';
import axios from 'axios';
import { AWS_API_URL, GCP_API_URL } from '../../../../index';


// GCP 옵션 상수 추가
const GCP_OPTIONS = {
  machineTypes: [
    'n1-standard-1',
    'n1-standard-2',
    'n1-standard-4',
    'n1-standard-8',
    'n1-standard-16'
  ],
  zones: [
    'asia-northeast3-a',
    'asia-northeast3-b',
    'asia-northeast3-c',
    'asia-east1-a',
    'asia-east1-b'
  ],
  imageFamilies: [
    'debian-11',
    'debian-10',
    'ubuntu-2004-lts',
    'ubuntu-2204-lts',
    'centos-7'
  ],
  imageProjects: [
    'debian-cloud',
    'ubuntu-os-cloud',
    'centos-cloud',
    'rhel-cloud'
  ],
  networkNames: [
    'default',
    'custom-network-1',
    'custom-network-2'
  ],
  subnetworkNames: [
    'default',
    'subnet-1',
    'subnet-2'
  ],
  diskTypes: [
    'pd-standard',
    'pd-balanced',
    'pd-ssd'
  ]
};

// AWS 옵션 상수 추가
const AWS_OPTIONS = {
  instanceTypes: [
    't2.micro',
    't2.small',
    't2.medium',
    't2.large',
    't3.micro',
    't3.small'
  ],
  amiIds: [
    { id: 'ami-0c55b159cbfafe1f0', name: 'Amazon Linux 2 AMI' },
    { id: 'ami-0892d3c7ee96c0bf7', name: 'Ubuntu Server 20.04 LTS' },
    { id: 'ami-0b0dcb5067f052a63', name: 'Red Hat Enterprise Linux 8' }
  ]
};

export default function CreateEC2Modal({ isOpen, onClose, onSubmit, isLoading }) {
  const [selectedProvider, setSelectedProvider] = useState(null);
  const { currentUser, selectedCompany, projectId } = useUserContext();
  
  
  // Networks와 Subnets 관련 state
  const [networks, setNetworks] = useState([]);
  const [subnetworks, setSubnetworks] = useState([]);
  const [isLoadingNetworks, setIsLoadingNetworks] = useState(false);
  const [isLoadingSubnets, setIsLoadingSubnets] = useState(false);

  // AWS 관련 state
  const [instanceName, setInstanceName] = useState('');
  const [instanceType, setInstanceType] = useState('t2.micro');
  const [amiId, setAmiId] = useState('');
  const [subnetName, setSubnetName] = useState('');
  const [securityGroupName, setSecurityGroupName] = useState('');
  const [keyPairName, setKeyPairName] = useState('');

  // GCP 관련 state
  const [vmName, setVmName] = useState('');
  const [machineType, setMachineType] = useState('n1-standard-1');
  const [zone, setZone] = useState('asia-northeast3-a');
  const [imageFamily, setImageFamily] = useState('debian-11');
  const [imageProject, setImageProject] = useState('debian-cloud');
  const [networkName, setNetworkName] = useState('default');
  const [subnetworkName, setSubnetworkName] = useState('default');
  const [diskType, setDiskType] = useState('pd-standard');
  const [diskSizeGb, setDiskSizeGb] = useState('10');

  // State 추가
  const [securityGroups, setSecurityGroups] = useState([]);
  const [isLoadingSecurityGroups, setIsLoadingSecurityGroups] = useState(false);

  // Security Group 목록 가져오기 함수 추가
  const fetchSecurityGroups = async () => {
    setIsLoadingSecurityGroups(true);
    try {
      const response = await axios.get(
        `${AWS_API_URL}/security-group/describe?userId=${currentUser.id}&companyName=${selectedCompany}`
      );
      const awsSecurityGroups = response.data.list?.map(sg => ({
        name: sg.tags?.Name || sg.groupName || '-',
        id: sg.groupId
      })) || [];
      setSecurityGroups(awsSecurityGroups);
      if (awsSecurityGroups.length > 0 && !securityGroupName) {
        setSecurityGroupName(awsSecurityGroups[0].name);
      }
    } catch (error) {
      NotificationManager.error('Failed to fetch security groups');
      console.error('Error fetching security groups:', error);
    } finally {
      setIsLoadingSecurityGroups(false);
    }
  };

  // useEffect 추가
  useEffect(() => {
    if (isOpen && selectedProvider === 'AWS') {
      fetchSecurityGroups();
    }
  }, [isOpen, selectedProvider]);

  // 네트워크 목록 가져오기
  const fetchNetworks = async () => {
    setIsLoadingNetworks(true);
    try {
      if (selectedProvider === 'AWS') {
        const response = await axios.get(
          `${AWS_API_URL}/vpc/describe?userId=${currentUser.id}&companyName=${selectedCompany}`
        );
        const awsNetworks = response.data.list?.map(vpc => ({
          name: vpc.tags?.Name || '-',
          id: vpc.vpcId
        })) || [];
        setNetworks(awsNetworks);
        if (awsNetworks.length > 0 && !networkName) {
          setNetworkName(awsNetworks[0].name);
        }
      } else if (selectedProvider === 'GCP') {
        const response = await axios.get(
          `${GCP_API_URL}/vpc/describe?projectId=${projectId}&userId=${currentUser.id}&companyName=${selectedCompany}`
        );
        const gcpNetworks = response.data.list?.map(vpc => ({
          name: vpc.vpcName || '-',
          id: vpc.vpcId
        })) || [];
        setNetworks(gcpNetworks);
        if (gcpNetworks.length > 0 && !networkName) {
          setNetworkName(gcpNetworks[0].name);
        }
      }
    } catch (error) {
      NotificationManager.error('Failed to fetch networks');
      console.error('Error fetching networks:', error);
    } finally {
      setIsLoadingNetworks(false);
    }
  };

  // 서브넷 목록 가져오기
  const fetchSubnetworks = async () => {
    if (!networkName) return;
    
    setIsLoadingSubnets(true);
    try {
      if (selectedProvider === 'AWS') {
        const response = await axios.get(
          `${AWS_API_URL}/subnet/describe?userId=${currentUser.id}&companyName=${selectedCompany}&vpcName=${networkName}`
        );
        const awsSubnets = response.data.list?.map(subnet => ({
          name: subnet.tags?.Name || '-',
          id: subnet.subnetId,
          cidr: subnet.cidr
        })) || [];
        setSubnetworks(awsSubnets);
        if (awsSubnets.length > 0 && !subnetworkName) {
          setSubnetworkName(awsSubnets[0].name);
        }
      } else if (selectedProvider === 'GCP') {
        const response = await axios.get(
          `${GCP_API_URL}/subnet/describe?projectId=${projectId}&userId=${currentUser.id}&companyName=${selectedCompany}&vpcName=${networkName}`
        );
        const gcpSubnets = response.data.list?.map(subnet => ({
          name: subnet.subnetName || '-',
          id: subnet.subnetId,
          cidr: subnet.cidr
        })) || [];
        setSubnetworks(gcpSubnets);
        if (gcpSubnets.length > 0 && !subnetworkName) {
          setSubnetworkName(gcpSubnets[0].name);
        }
      }
    } catch (error) {
      NotificationManager.error('Failed to fetch subnetworks');
      console.error('Error fetching subnetworks:', error);
    } finally {
      setIsLoadingSubnets(false);
    }
  };

  // useEffect 수정
  useEffect(() => {
    if (isOpen) {
      fetchNetworks();
    }
  }, [selectedProvider, isOpen]);

  useEffect(() => {
    if (isOpen && networkName) {
      fetchSubnetworks();
    }
  }, [networkName, isOpen, selectedProvider]);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    // 입력값 검증
    if (selectedProvider === 'AWS') {
      if (!instanceName || !instanceType || !amiId || !subnetName || !securityGroupName) {
        NotificationManager.warning('Please fill in all required fields for AWS instance');
        return;
      }
    } else if (selectedProvider === 'GCP') {
      if (!vmName || !machineType || !zone || !imageFamily || !imageProject || 
          !networkName || !subnetworkName || !diskType || !diskSizeGb) {
        NotificationManager.warning('Please fill in all required fields for GCP instance');
        return;
      }
    }

    const apiUrl = selectedProvider === 'AWS' ? AWS_API_URL : GCP_API_URL;
    const endpoint = selectedProvider === 'AWS' ? 'ec2/create' : 'vm/create';

    try {
      // Provider에 따른 요청 데이터 구성
      const requestData = selectedProvider === 'AWS' 
        ? {
            instanceName: instanceName,
            instanceType: instanceType,
            amiId: amiId,
            subnetName: subnetName,
            securityGroupName: securityGroupName,
            keyPairName: keyPairName,
          }
        : {
            vmName: vmName,
            machineType: machineType,
            zone: zone,
            imageFamily: imageFamily,
            imageProject: imageProject,
            networkName: networkName,
            subnetworkName: subnetworkName,
            diskType: diskType,
            diskSizeGb: diskSizeGb,
          };

      // 로딩 상태 시작
      NotificationManager.info(`Creating ${selectedProvider} instance...`);

      // API 요청
      await axios.post(
        selectedProvider == 'AWS'? `${apiUrl}/${endpoint}?userId=${currentUser.id}`:
        `${apiUrl}/${endpoint}?userId=${currentUser.id}&projectId=${projectId}`, 
        requestData
      );

      // 성공 메시지
      NotificationManager.success(
        `Successfully created ${selectedProvider} instance: ${selectedProvider === 'AWS' ? instanceName : vmName}`
      );

      // 모달 닫기 및 데이터 새로고침
      onClose();
      onSubmit();

    } catch (error) {
      // 에러 처리
      console.error('Error creating instance:', error);
      NotificationManager.error(
        error.response?.data?.message || `Failed to create ${selectedProvider} instance`
      );
    }
  };

  const handleBack = () => {
    setSelectedProvider(null);
    // Reset AWS fields
    setInstanceName('');
    setInstanceType('t2.micro');
    setAmiId('');
    setSubnetName('');
    setSecurityGroupName('');
    setKeyPairName('');
    // Reset GCP fields
    setVmName('');
    setMachineType('n1-standard-1');
    setZone('asia-northeast3-a');
    setImageFamily('debian-11');
    setImageProject('debian-cloud');
    setNetworkName('default');
    setSubnetworkName('default');
    setDiskType('pd-standard');
    setDiskSizeGb('10');
  };

  const handleClose = () => {
    handleBack();
    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={handleClose}>×</button>
        
        {!selectedProvider ? (
          <div className={styles.providerSelection}>
            <h2>Select Cloud Provider</h2>
            <div className={styles.providerButtons}>
              <button 
                onClick={() => setSelectedProvider('AWS')}
                className={styles.providerButton}
              >
                AWS
              </button>
              <button 
                onClick={() => setSelectedProvider('GCP')}
                className={styles.providerButton}
              >
                GCP
              </button>
            </div>
          </div>
        ) : (
          <div className={styles.instanceForm}>
            <h2>Create {selectedProvider} Instance</h2>
            
            {selectedProvider === 'AWS' ? (
              // AWS Form
              <>
                <div className={styles.formGroup}>
                  <label>Instance Name *</label>
                  <input
                    type="text"
                    value={instanceName}
                    onChange={(e) => setInstanceName(e.target.value)}
                    placeholder="Enter instance name"
                    className={styles.input}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Instance Type *</label>
                  <select
                    value={instanceType}
                    onChange={(e) => setInstanceType(e.target.value)}
                    className={styles.input}
                  >
                    {AWS_OPTIONS.instanceTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label>AMI *</label>
                  <select
                    value={amiId}
                    onChange={(e) => setAmiId(e.target.value)}
                    className={styles.input}
                  >
                    <option value="">Select an AMI</option>
                    {AWS_OPTIONS.amiIds.map(ami => (
                      <option key={ami.id} value={ami.id}>{ami.name} ({ami.id})</option>
                    ))}
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <div className={styles.labelWithRefresh}>
                    <label>Subnet *</label>
                    <button 
                      onClick={fetchSubnetworks}
                      disabled={isLoadingSubnets || !networkName}
                      className={styles.refreshButton}
                      title="Refresh subnets list"
                    >
                      <svg 
                        className={`${styles.refreshIcon} ${isLoadingSubnets ? styles.spinning : ''}`}
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 24 24" 
                        width="18" 
                        height="18"
                      >
                        <path d="M23 4v6h-6M1 20v-6h6M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
                      </svg>
                    </button>
                  </div>
                  <select
                    value={subnetName}
                    onChange={(e) => setSubnetName(e.target.value)}
                    placeholder="Enter subnet name"
                    className={styles.input}
                    disabled={isLoadingSubnets}
                  >
                    <option value="">Select a subnet</option>
                    {subnetworks.map(subnet => (
                      <option key={subnet.id} value={subnet.name}>
                        {subnet.name} ({subnet.cidr})
                      </option>
                    ))}
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <div className={styles.labelWithRefresh}>
                    <label>Security Group *</label>
                    <button 
                      onClick={fetchSecurityGroups}
                      disabled={isLoadingSecurityGroups}
                      className={styles.refreshButton}
                      title="Refresh security groups list"
                    >
                      <svg 
                        className={`${styles.refreshIcon} ${isLoadingSecurityGroups ? styles.spinning : ''}`}
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 24 24" 
                        width="18" 
                        height="18"
                      >
                        <path d="M23 4v6h-6M1 20v-6h6M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
                      </svg>
                    </button>
                  </div>
                  <select
                    value={securityGroupName}
                    onChange={(e) => setSecurityGroupName(e.target.value)}
                    className={styles.input}
                    disabled={isLoadingSecurityGroups}
                  >
                    <option value="">Select a security group</option>
                    {securityGroups.map(sg => (
                      <option key={sg.id} value={sg.name}>
                        {sg.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label>Key Pair</label> {/* '*' 제거됨 */}
                  <select
                    value={keyPairName}
                    onChange={(e) => setKeyPairName(e.target.value)}
                    placeholder="Enter key pair name"
                    className={styles.input}
                  >
                    <option value="">Select a key pair (optional)</option>
                    <option value="my-key-pair">my-key-pair</option>
                    <option value="development">development</option>
                    <option value="production">production</option>
                  </select>
                </div>
              </>
            ) : (
              // GCP Form
              <>
                <div className={styles.formGroup}>
                  <label>VM Name *</label>
                  <input
                    type="text"
                    value={vmName}
                    onChange={(e) => setVmName(e.target.value)}
                    placeholder="Enter VM name"
                    className={styles.input}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Machine Type *</label>
                  <select
                    value={machineType}
                    onChange={(e) => setMachineType(e.target.value)}
                    className={styles.input}
                  >
                    {GCP_OPTIONS.machineTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label>Zone *</label>
                  <select
                    value={zone}
                    onChange={(e) => setZone(e.target.value)}
                    className={styles.input}
                  >
                    {GCP_OPTIONS.zones.map(z => (
                      <option key={z} value={z}>{z}</option>
                    ))}
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label>Image Family *</label>
                  <select
                    value={imageFamily}
                    onChange={(e) => setImageFamily(e.target.value)}
                    className={styles.input}
                  >
                    {GCP_OPTIONS.imageFamilies.map(family => (
                      <option key={family} value={family}>{family}</option>
                    ))}
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label>Image Project *</label>
                  <select
                    value={imageProject}
                    onChange={(e) => setImageProject(e.target.value)}
                    className={styles.input}
                  >
                    {GCP_OPTIONS.imageProjects.map(project => (
                      <option key={project} value={project}>{project}</option>
                    ))}
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <div className={styles.labelWithRefresh}>
                    <label>Network Name *</label>
                    <button 
                      onClick={fetchNetworks}
                      disabled={isLoadingNetworks}
                      className={styles.refreshButton}
                      title="Refresh networks list"
                    >
                      <svg 
                        className={`${styles.refreshIcon} ${isLoadingNetworks ? styles.spinning : ''}`}
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 24 24" 
                        width="18" 
                        height="18"
                      >
                        <path d="M23 4v6h-6M1 20v-6h6M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
                      </svg>
                    </button>
                  </div>
                  <select
                    value={networkName}
                    onChange={(e) => setNetworkName(e.target.value)}
                    className={styles.input}
                    disabled={isLoadingNetworks}
                  >
                    <option value="">Select a network</option>
                    {networks.map(network => (
                      <option key={network.id} value={network.name}>
                        {network.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <div className={styles.labelWithRefresh}>
                    <label>Subnetwork Name *</label>
                    <button 
                      onClick={fetchSubnetworks}
                      disabled={isLoadingSubnets || !networkName}
                      className={styles.refreshButton}
                      title="Refresh subnetworks list"
                    >
                      <svg 
                        className={`${styles.refreshIcon} ${isLoadingSubnets ? styles.spinning : ''}`}
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 24 24" 
                        width="18" 
                        height="18"
                      >
                        <path d="M23 4v6h-6M1 20v-6h6M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
                      </svg>
                    </button>
                  </div>
                  <select
                    value={subnetworkName}
                    onChange={(e) => setSubnetworkName(e.target.value)}
                    className={styles.input}
                    disabled={isLoadingSubnets || !networkName}
                  >
                    <option value="">Select a subnet</option>
                    {subnetworks.map(subnet => (
                      <option key={subnet.id} value={subnet.name}>
                        {subnet.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label>Disk Type *</label>
                  <select
                    value={diskType}
                    onChange={(e) => setDiskType(e.target.value)}
                    className={styles.input}
                  >
                    {GCP_OPTIONS.diskTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label>Disk Size (GB) *</label>
                  <input
                    type="number"
                    value={diskSizeGb}
                    onChange={(e) => setDiskSizeGb(e.target.value)}
                    placeholder="Enter disk size in GB"
                    min="10"
                    max="65536"
                    className={styles.input}
                  />
                </div>
              </>
            )}

            <div className={styles.buttonGroup}>
              <button 
                onClick={handleBack}
                className={styles.backButton}
              >
                Back
              </button>
              <button
                onClick={handleSubmit}
                className={styles.submitButton}
                disabled={isLoading}
              >
                {isLoading ? 'Creating...' : 'Create Instance'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 