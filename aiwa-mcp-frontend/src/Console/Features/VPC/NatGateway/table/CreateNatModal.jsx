import React, { useState, useEffect } from 'react';
import styles from './CreateNatModal.module.css';
import axios from 'axios';
import { API_URL } from '../../../../../index';
import { useUserContext } from '../../../../../UserContext';
import { Menu, MenuItem, MenuButton, Button, Flex, Alert } from "@aws-amplify/ui-react";


function CreateNatModal({ isOpen, onClose }) {
  const [natData, setnatData] = useState({
    name: '',
    // subnetId 제거: 이제 selectedSubnet를 사용합니다
  });

  
  const [latestSubnet, setlatestSubnet] = useState([]); // Holds the list of subnets 
  const [selectedSubnet, setselectedSubnet] = useState("non-selected"); // Default to non-selected

  const [latestElasticIp, setlatestElasticIp] = useState([]); // Holds the list of subnets 
  const [selectedElasticIp, setselectedElasticIp] = useState("non-selected"); // Default to non-selected

  const { currentUser } = useUserContext(); 

  const [hasInternetGateway, setHasInternetGateway] = useState(null);
  const [isChecking, setIsChecking] = useState(false);

  

  // Handle subnet selection
  const handlesubnetSelect = (subnetName) => {
    setselectedSubnet(subnetName);
    if (natData.connectType === 'public') {
      checkInternetGateway(subnetName);
    }
  };

  // Handle elastic ip selection
  const handleElasticIpSelect = (eipid) => {
    setselectedElasticIp(eipid);
  };


    // Fetch the latest subnet data
    const fetchSubnetData = async () => {
        try {
            const response = await axios.get(`${API_URL}/subnet/describe?userId=${currentUser.id}`);
            console.log("fetch subnet data", response.data);
            if (response.data.list && response.data.list.length > 0) {
                setlatestSubnet(response.data.list); // Set the list of subnets
            }
        } catch (error) {
            console.error("Error fetching subnet data:", error);
        }
    };
  
    useEffect(() => {
        fetchSubnetData();
    }, []);    

    // fetch elastic ip data
    const fetchElasticIpData = async () => {
      try {
          const response = await axios.get(`${API_URL}/eip/describe?userId=${currentUser.id}`);
          console.log("fetch elastic ip data", response.data);
          if (response.data.list && response.data.list.length > 0) {
              setlatestElasticIp(response.data.list); // Set the list of subnets
          }
      } catch (error) {
          console.error("Error fetching elastic ip data:", error);
      }
  };

  useEffect(() => {
    fetchElasticIpData();
  }, []);      

    // Handle Subnet creation
    const handleCreateEIP = async () => {
      const newEIP = {
          eipId: '',
          userId: currentUser.id,
      };

      try {
          const response = await axios.post(`${API_URL}/eip/create`, newEIP);
          console.log("create eip", response.data);
      } catch (error) {
          console.error("Error creating EIP:", error);
      }
  };  

  useEffect(() => {
    handleCreateEIP();
  }, []);    


    const addnewNAT = async () => {
    const newNAT = {
      natGatewayName: natData.name,
      subnetName: selectedSubnet,
      elasticIpName: "",
      allocationId: selectedElasticIp,
    };

    try {
      const response = await axios.post(`${API_URL}/nat-gateway/create?userId=${currentUser.id}`, newNAT);
      console.log(response.data);
      onClose();
    } catch (error) {
      console.error("Error creating Nat Gateway:", error);
    }
  };

  const checkInternetGateway = async (subnetName) => {
    setIsChecking(true);
    try {
      const response = await axios.get(`${API_URL}/vpc/check-internet-gateway?userId=${currentUser.id}&subnetName=${subnetName}`);
      setHasInternetGateway(response.data.hasInternetGateway);
    } catch (error) {
      console.error("Error checking Internet Gateway:", error);
      setHasInternetGateway(false);
    }
    setIsChecking(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setnatData(prevData => ({
      ...prevData,
      [name]: value
    }));
    if (name === 'connectType' && value === 'public' && selectedSubnet !== 'non-selected') {
      checkInternetGateway(selectedSubnet);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addnewNAT();    
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>Create New Nat Gateway</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={natData.name}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            subnet ID:
            <Menu
                trigger={
                    <MenuButton style={{ textAlign: 'left', width: '100%', justifyContent: 'flex-start' }}>
                        {selectedSubnet === "non-selected" ? "subnet 선택" : `${selectedSubnet}`}
                    </MenuButton>
                }
                style={{ textAlign: 'left' }}  // Ensure left alignment for the menu
            >
                {latestSubnet.length > 0 ? (
                    latestSubnet.map((subnet) => (
                        <MenuItem key={subnet.subnetId} onClick={() => handlesubnetSelect(subnet.tags.Name)}>
                            <div>
                                subnet ID: {subnet.subnetId} - {subnet.tags.Name || 'Unnamed'}
                                <div style={{ fontSize: '0.8em', color: '#999' }}>{subnet.availabilityZone}</div>
                            </div>
                        </MenuItem>
                    ))
                ) : (
                    <MenuItem>subnet 데이터 없음</MenuItem>
                )}
            </Menu>            
          </label>
          <label>
            Connect Type: 
            <select 
              name="connectType" 
              value={natData.connectType} 
              onChange={handleChange}
              style={{ marginLeft: '10px' }}
            >
              <option value="public">Public</option>         
            </select>
          </label>

          {natData.connectType === 'public' && selectedSubnet !== 'non-selected' && (
            <div>
              {isChecking ? (
                <p>Checking Internet Gateway...</p>
              ) : hasInternetGateway === null ? (
                <p>Select a subnet to check Internet Gateway</p>
              ) : hasInternetGateway ? (
                <Alert variation="success">The selected subnet's VPC has an Internet Gateway</Alert>
              ) : (
                <Alert variation="error">The selected subnet's VPC does not have an Internet Gateway</Alert>
              )}
            </div>
          )}

          <Flex direction="row" alignItems="center">            
            <label style={{ flex: 1 }}>
              Elastic IP:
              <Menu
                  trigger={
                      <MenuButton style={{ textAlign: 'left', width: '100%', justifyContent: 'flex-start', height: '40px' }}>
                          {selectedElasticIp === "non-selected" ? "elastic ip 선택" : `${selectedElasticIp}`}
                      </MenuButton>
                  }
                  style={{ textAlign: 'left' }}  // Ensure left alignment for the menu
              >
                  {latestElasticIp.length > 0 ? (
                      latestElasticIp.map((eip) => (
                          <MenuItem key={eip.allocationId} onClick={() => handleElasticIpSelect(eip.allocationId)}>
                              <div>
                                  {eip.allocationId} - {eip.tags.Name || "unnamed"}
                                  <div style={{ fontSize: '0.8em', color: '#999' }}>{eip.publicIp}</div>                            
                              </div>
                          </MenuItem>
                      ))
                  ) : (
                      <MenuItem>eip 데이터 없음</MenuItem>
                  )}
              </Menu>                     
            </label>     
          {/* Button to refresh Elastic IP data 높이 맞춰야함!!!*/}
          <Button
              onClick={handleCreateEIP}
              className="filterButton"
              style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginLeft: '10px', // Adjusted margin for spacing
                  height: '40px', // Match the height of the Menu selection
                  boxSizing: 'border-box' // Ensure padding is included in the height
              }}
          >elastic ip 할당
          </Button>
          </Flex>
          {/* 필요한 다른 입력 필드들을 추가하세요 */}
          <div className={styles.buttonGroup}>
            <button type="submit" onClick={handleSubmit}>Create</button>  
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateNatModal;
