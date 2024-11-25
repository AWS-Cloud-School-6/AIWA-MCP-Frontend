import React from 'react';
import { Flex, Heading } from '@aws-amplify/ui-react';
import EC2Table from "./table/EC2Table";
import SidebarEc2 from "./Sidebar/SidebarEc2";
import NavBar from '../../NavBar/NavBar';

function Instance() {
    return (
        <div>
            <NavBar />
            <Flex direction="row">
                <SidebarEc2 />
                <Flex direction="column" style={{ width: '100%', padding: '20px' }}>
                    <Flex justifyContent="space-between" alignItems="center" marginBottom="20px">
                        <Heading level={4}>EC2 List</Heading>
                    </Flex>
                    <EC2Table />
                </Flex>
            </Flex>
        </div>
    );
}

export default Instance;
