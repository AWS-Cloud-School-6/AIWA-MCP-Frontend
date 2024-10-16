import React from 'react';
import { Flex, Heading } from '@aws-amplify/ui-react';
import { SideBar, NavBarHeader2 } from '../../../ui-components';
import EC2Table from "./table/EC2Table";

function Instance() {
    return (
        <div>
            <NavBarHeader2 />
            <Flex direction="row">
                <SideBar />
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
