import React from "react";
import { Flex, Button, View, Heading } from "@aws-amplify/ui-react";
import SidebarVpc from "../Sidebar/SidebarEc2";
import NavBar from "../../../NavBar/NavBar";
import ENITable from "./table/ENITable";


function ENI() {
    return (
        <div>
            <NavBar />
            <Flex direction="row">
                <SidebarVpc />
                <Flex direction="column" style={{ width: '100%', padding: '20px' }}>
                    <Flex justifyContent="space-between" alignItems="center" marginBottom="20px">
                        <Heading level={4}>ENI List</Heading>
                    </Flex>
                    <ENITable />
                </Flex>
            </Flex>
        </div>
    );
}

export default ENI;
