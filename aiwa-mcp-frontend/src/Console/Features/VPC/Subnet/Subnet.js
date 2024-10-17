import React from "react";
import { Flex, Button, View, Heading } from "@aws-amplify/ui-react";
import SubnetTable from "./table/SubnetTable";
import SidebarVpc from "../Sidebar/SidebarVpc";
import NavBar from "../../../NavBar/NavBar";


function Subnet() {
    return (
        <div>
            <NavBar />
            <Flex direction="row">
                <SidebarVpc />
                <Flex direction="column" style={{ width: '100%', padding: '20px' }}>
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
