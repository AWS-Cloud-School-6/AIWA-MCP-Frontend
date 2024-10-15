import React, { useState, useEffect } from "react";
import { Flex, Button, View, Heading } from "@aws-amplify/ui-react";
import { SideBar, NavBarHeader2 } from "../../../ui-components";
import CustomerTable from "./table/CustomerTable";


function VPC() {


  return (
    <div>
      <NavBarHeader2 />
      <Flex direction="row">
        <SideBar />
        <Flex direction="column" style={{ width: '100%', padding: '20px' }}>
          <Flex justifyContent="space-between" alignItems="center" marginBottom="20px">
            <Heading level={4}>VPC List</Heading>
          </Flex>
          <CustomerTable />
        </Flex>
      </Flex>
    </div>
  );
}

export default VPC;
