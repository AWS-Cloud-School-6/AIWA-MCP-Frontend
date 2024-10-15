import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import {
    Button,
    TextField,
    SelectField,
    Table,
    TableCell,
    TableHead,
    TableRow
} from '@aws-amplify/ui-react';
import axios from 'axios';
import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css'; // Dropdown styles

const API_ENDPOINT = 'https://your-api-gateway-endpoint'; // Replace with your API Gateway URL

function Instance() {
    const [instances, setInstances] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [instanceState, setInstanceState] = useState('running');
    const navigate = useNavigate(); // React Router's navigation hook

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
        <div style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h1>AWS EC2 Console</h1>

                <div style={{ display: 'flex', gap: '10px' }}>
                    <Button onClick={fetchInstances}>Refresh</Button>

                    <Menu menuButton={<MenuButton>Actions ▾</MenuButton>}>
                        <MenuItem disabled>Connect</MenuItem>
                        <MenuItem disabled>View details</MenuItem>
                        <MenuItem disabled>Manage instance state</MenuItem>
                        <MenuItem>Instance settings</MenuItem>
                        <MenuItem>Networking</MenuItem>
                        <MenuItem>Security</MenuItem>
                        <MenuItem>Image and templates</MenuItem>
                        <MenuItem>Monitor and troubleshoot</MenuItem>
                    </Menu>

                    <Menu menuButton={<MenuButton>Launch Instances ▾</MenuButton>}>
                        <MenuItem onClick={() => navigate('aws')}>AWS</MenuItem>
                        <MenuItem onClick={() => navigate('gcp')}>GCP</MenuItem>
                    </Menu>
                </div>
            </div>

            <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
                <TextField
                    label="Search by Instance ID"
                    placeholder="Enter Instance ID"
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                <SelectField
                    label="Instance State"
                    onChange={(e) => setInstanceState(e.target.value)}
                    value={instanceState}
                >
                    <option value="running">Running</option>
                    <option value="stopped">Stopped</option>
                    <option value="terminated">Terminated</option>
                </SelectField>
            </div>

            <Table caption="EC2 Instances">
                <TableHead>
                    <TableRow>
                        <TableCell>Instance ID</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>State</TableCell>
                        <TableCell>Launch Time</TableCell>
                        <TableCell>Availability Zone</TableCell>
                    </TableRow>
                </TableHead>
                <tbody>
                    {filteredInstances.length > 0 ? (
                        filteredInstances.map((instance) => (
                            <TableRow key={instance.InstanceId}>
                                <TableCell>{instance.InstanceId}</TableCell>
                                <TableCell>{instance.InstanceType}</TableCell>
                                <TableCell>{instance.State.Name}</TableCell>
                                <TableCell>{new Date(instance.LaunchTime).toLocaleString()}</TableCell>
                                <TableCell>{instance.Placement.AvailabilityZone}</TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan="5" style={{ textAlign: 'center' }}>
                                No matching instances found.
                            </TableCell>
                        </TableRow>
                    )}
                </tbody>
            </Table>

        </div>
    );
}

export default Instance;
