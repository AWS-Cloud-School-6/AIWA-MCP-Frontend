import React from "react";
import { Flex, Button, View, Heading } from "@aws-amplify/ui-react";
import SecuritygroupTable from "./table/SecuritygroupTable";
import NavBar from "../../../NavBar/NavBar";
import SidebarEc2 from "../Sidebar/SidebarEc2";


function Securitygroup() {
    return (
        <div>
            <NavBar />
            <Flex direction="row">
                <SidebarEc2 />
                <Flex direction="column" style={{ width: '100%', padding: '20px' }}>
                    <Flex justifyContent="space-between" alignItems="center" marginBottom="20px">
                        <Heading level={4}>Securitygroup List</Heading>
                    </Flex>
                    <SecuritygroupTable />
                </Flex>
            </Flex>
        </div>
    );
}

export default Securitygroup;
