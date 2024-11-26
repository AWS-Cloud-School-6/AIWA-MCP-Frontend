import React from "react";
import { Flex, Button, View, Heading } from "@aws-amplify/ui-react";
import SubnetTable from "./table/SubnetTable";
import SidebarVpc from "../Sidebar/SidebarVpc";
import NavBar from "../../../NavBar/NavBar";


function Subnet() {
    return (
        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
            <NavBar />
            <Flex direction="row" style={{ flex: 1, overflow: 'hidden' }}>
                <SidebarVpc />
                <Flex direction="column" style={{ width: '100%', padding: '20px', overflow: 'auto' }}>
                    <Flex justifyContent="space-between" alignItems="center" marginBottom="20px">
                        <Heading level={4}>Subnet List</Heading>
                    </Flex>
                    <SubnetTable />
                </Flex>
            </Flex>
        </div>
    );
}

export default Subnet;
