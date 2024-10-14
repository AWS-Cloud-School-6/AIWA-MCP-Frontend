import React, { useState, useEffect } from "react";
import { Flex, Button, View, Heading } from "@aws-amplify/ui-react";
import { SideBar, NavBarHeader2 } from "../../../ui-components";
import CustomerTable from "./table/CustomerTable";


function VPC() {
  const [vpcList, setVpcList] = useState([]);
  const [selectedVpcs, setSelectedVpcs] = useState([]);

  useEffect(() => {
    // 여기서 VPC 목록을 가져오는 API 호출을 수행합니다.
    // 예시 데이터로 대체합니다.
    const mockVpcList = [
      { id: 1, name: "VPC-1", cidrBlock: "10.0.0.0/16", status: "available" },
      { id: 2, name: "VPC-2", cidrBlock: "172.16.0.0/16", status: "pending" },
      { id: 3, name: "VPC-3", cidrBlock: "192.168.0.0/16", status: "deleting" },
      { id: 4, name: "VPC-4", cidrBlock: "10.1.0.0/16", status: "deleted" },
    ];
    setVpcList(mockVpcList);
  }, []);


  const columns = [
    // { field: 'name', headerName: 'VPC Name', flex: 1 },
    // { field: 'cidrBlock', headerName: 'CIDR Block', flex: 1 },
    // { 
    //   field: 'status', 
    //   headerName: 'Status', 
    //   flex: 1,

    // },
 
  ];

  const handleSelectionChange = (newSelection) => {
    setSelectedVpcs(newSelection);
  };

  const handleEdit = (id) => {
    console.log(`Editing VPC with id: ${id}`);
    // Implement edit functionality here
  };

  const handleDelete = (id) => {
    console.log(`Deleting VPC with id: ${id}`);
    // Implement delete functionality here
  };

  return (
    <div>
      <NavBarHeader2 />
      <Flex direction="row">
        <SideBar />
        <Flex direction="column" style={{ width: '100%', padding: '20px' }}>
          <Flex justifyContent="space-between" alignItems="center" marginBottom="20px">
            <Heading level={4}>VPC List</Heading>
            {/* Button removed as per instructions */}
          </Flex>
          <CustomerTable
            rows={vpcList}
            columns={columns}
            pageSize={5}
            checkboxSelection={true}
            onSelectionModelChange={handleSelectionChange}
          />
        </Flex>
      </Flex>
    </div>
  );
}

export default VPC;
