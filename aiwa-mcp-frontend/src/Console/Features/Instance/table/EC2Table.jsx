import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Button,
    TextField,
    SelectField,
    Table,
    TableCell,
    TableHead,
    TableRow,
} from '@aws-amplify/ui-react';
import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import axios from 'axios';
import styles from './EC2Table.module.css';

const API_ENDPOINT = 'https://your-api-gateway-endpoint'; // Replace with your API Gateway URL

// 예제 데이터 추가
const sampleInstances = [
  {
    InstanceId: 'i-1234567890abcdef0',
    InstanceType: 't2.micro',
    State: { Name: 'running' },
    LaunchTime: '2023-04-01T12:00:00.000Z',
    Placement: { AvailabilityZone: 'us-east-1a' }
  },
  {
    InstanceId: 'i-0987654321fedcba0',
    InstanceType: 't2.small',
    State: { Name: 'stopped' },
    LaunchTime: '2023-03-15T09:30:00.000Z',
    Placement: { AvailabilityZone: 'us-east-1b' }
  },
  {
    InstanceId: 'i-abcdef1234567890',
    InstanceType: 't3.medium',
    State: { Name: 'running' },
    LaunchTime: '2023-04-10T15:45:00.000Z',
    Placement: { AvailabilityZone: 'us-east-1c' }
  },
  {
    InstanceId: 'i-fedcba0987654321',
    InstanceType: 'm5.large',
    State: { Name: 'terminated' },
    LaunchTime: '2023-02-28T18:20:00.000Z',
    Placement: { AvailabilityZone: 'us-east-1d' }
  },
  {
    InstanceId: 'i-11223344556677889',
    InstanceType: 'c5.xlarge',
    State: { Name: 'running' },
    LaunchTime: '2023-04-05T10:15:00.000Z',
    Placement: { AvailabilityZone: 'us-east-1a' }
  }
];

function EC2Table() {
    const [instances, setInstances] = useState(sampleInstances);
    const [searchTerm, setSearchTerm] = useState('');
    const [instanceState, setInstanceState] = useState('running');
    const navigate = useNavigate();

    useEffect(() => {
        fetchInstances();
    }, []);

    const fetchInstances = () => {
        axios.get(`${API_ENDPOINT}/instances`)
            .then((response) => {
                setInstances(response.data);
            })
            .catch((error) => {
                console.error('Error fetching instances:', error);
            });
    };

    const filteredInstances = instances.filter(instance =>
        instance.State.Name === instanceState &&
        instance.InstanceId.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className={styles.dataTable}>
            <div className={styles.tableControls}>
                <div className={styles.searchContainer}>
                    <div className={styles.searchInputWrapper}>
                        <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/d322eb2c900627c1c0432bf23dfda65d4720f3b4b6381543703e324a72370a2e?placeholderIfAbsent=true&apiKey=0aa29cf27c604eac9ac8e5102203c841" alt="" className={styles.icon} />
                        <input
                            type="text"
                            placeholder="Search by Instance ID"
                            className={styles.searchInput}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <select
                        className={styles.filterButton}
                        onChange={(e) => setInstanceState(e.target.value)}
                        value={instanceState}
                    >
                        <option value="running">Running</option>
                        <option value="stopped">Stopped</option>
                        <option value="terminated">Terminated</option>
                    </select>
                </div>
                <div className={styles.actionButtons}>
                    <button onClick={fetchInstances} className={styles.filterButton} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ width: '20px', height: '20px' }}>
                        <path d="M23 4v6h-6"/>
                        <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
                    </svg>
                    </button>
                    <Menu menuButton={<MenuButton className={styles.filterButton}>Actions ▾</MenuButton>}>
                        <MenuItem disabled>Connect</MenuItem>
                        <MenuItem disabled>View details</MenuItem>
                        <MenuItem disabled>Manage instance state</MenuItem>
                        <MenuItem>Instance settings</MenuItem>
                        <MenuItem>Networking</MenuItem>
                        <MenuItem>Security</MenuItem>
                        <MenuItem>Image and templates</MenuItem>
                        <MenuItem>Monitor and troubleshoot</MenuItem>
                    </Menu>
                    <Menu menuButton={<MenuButton className={styles.EC2Button}>Launch Instances ▾</MenuButton>}>
                        <MenuItem onClick={() => navigate('aws')}>AWS</MenuItem>
                        <MenuItem onClick={() => navigate('gcp')}>GCP</MenuItem>
                    </Menu>
                </div>
            </div>

            <div className={styles.tableHeaderRow}>
                <div className={`${styles.cell} ${styles.idCell}`}>Instance ID</div>
                <div className={`${styles.cell} ${styles.typeCell}`}>Type</div>
                <div className={`${styles.cell} ${styles.statusCell}`}>State</div>
                <div className={`${styles.cell} ${styles.timeCell}`}>Launch Time</div>
                <div className={`${styles.cell} ${styles.AZCell}`}>Availability Zone</div>
            </div>

            {filteredInstances.length > 0 ? (
                filteredInstances.map((instance, index) => (
                    <div key={instance.InstanceId} className={index % 2 === 0 ? styles.VPCRow : styles.VPCRowEven}>
                        <div className={`${styles.cell} ${styles.idCell}`}>{instance.InstanceId}</div>
                        <div className={`${styles.cell} ${styles.typeCell}`}>{instance.InstanceType}</div>
                        <div className={`${styles.cell} ${styles.statusCell}`}>
                            <span className={`${styles.tag} ${styles[instance.State.Name.toLowerCase()]}`}>
                                {instance.State.Name}
                            </span>
                        </div>
                        <div className={`${styles.cell} ${styles.timeCell}`}>{new Date(instance.LaunchTime).toLocaleString()}</div>
                        <div className={`${styles.cell} ${styles.AZCell}`}>{instance.Placement.AvailabilityZone}</div>
                    </div>
                ))
            ) : (
                <div className={styles.VPCRow}>
                    <div className={styles.cell} style={{ textAlign: 'center', width: '100%' }}>
                        No matching instances found.
                    </div>
                </div>
            )}
        </div>
    );
}

export default EC2Table;
