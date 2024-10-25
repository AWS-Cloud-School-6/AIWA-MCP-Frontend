import React from "react";
import { Flex, Button, View, Heading } from "@aws-amplify/ui-react";
import SidebarVpc from "../Sidebar/SidebarVpc";
import NavBar from "../../../NavBar/NavBar";
import NatTable from "./table/NatTable";


function NatGateway() {
    return (
        <div>
            <NavBar />
            <Flex direction="row">
                <SidebarVpc />
                <Flex direction="column" style={{ width: '100%', padding: '20px' }}>
                    <Flex justifyContent="space-between" alignItems="center" marginBottom="20px">
                        <Heading level={4}>Nat Gateway List</Heading>
                    </Flex>
                    <NatTable />
                </Flex>
            </Flex>
        </div>
    );
}

export default NatGateway;
