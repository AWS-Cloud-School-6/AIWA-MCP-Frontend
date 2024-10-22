import React from "react";
import { Flex, Button, View, Heading } from "@aws-amplify/ui-react";
import SidebarVpc from "../Sidebar/SidebarVpc";
import NavBar from "../../../NavBar/NavBar";
import IGTable from "./table/IGTable";


function InternetGateway() {
    return (
        <div>
            <NavBar />
            <Flex direction="row">
                <SidebarVpc />
                <Flex direction="column" style={{ width: '100%', padding: '20px' }}>
                    <Flex justifyContent="space-between" alignItems="center" marginBottom="20px">
                        <Heading level={4}>Internet Gateway List</Heading>
                    </Flex>
                    <IGTable />
                </Flex>
            </Flex>
        </div>
    );
}

export default InternetGateway;
