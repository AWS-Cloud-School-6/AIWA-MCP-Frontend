import { useState } from "react";
import { Flex, View, Text, Icon } from '@aws-amplify/ui-react';
import { ListboxComponent, NavBarHeader2, SideBar } from '../ui-components';
import React from 'react';
import { getOverrideProps } from "../ui-components/utils";

const ConsoleListboxComponent = (props) => {
    const handleChevronClick = () => {
        // 여기서 원하는 동작을 추가합니다.
        alert('Custom Chevron Clicked!');
    };

    // ListboxComponent의 props를 사용하여 모든 속성을 전달합니다.
    return (
        <ListboxComponent
            {...props}
            overrides={{
                ...props.overrides,
                Chevron: {
                    onClick: handleChevronClick, // Chevron 클릭 시 동작 설정
                },
            }}
        />
    );    
}


function Console({overrides}) {
    // 드롭다운 상태 관리
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    
    // 드롭다운 열기/닫기 토글
    const handleToggle = () => {
        setIsOpen(!isOpen); 
    };    
    
    const handleSelectItem = (item) => {
        setSelectedItem(item);
        setIsOpen(false); // 항목 선택 후 드롭다운 닫기
    };
  
    const items = ["Option 1", "Option 2", "Option 3", "Option 4"];

    // ListboxComponent 오버라이드
    const listboxOverrides = {
        "Chevron": {
            onClick: () => {
                alert('Chevron Clicked!');
                // 드롭다운 열기/닫기 처리
                handleToggle();
            }
        },
        // "Dropdown List": {
        //     display: isOpen ? "flex" : "none", // 드롭다운 상태에 따라 표시
        // },
        // // Dropdown List에서 각 항목 클릭 시 처리
        // "Dropdown Item": items.map((item, index) => ({
        //     onClick: () => handleSelectItem(item),
        //     children: item,
        //     key: index,
        // })),
    };

    const [selectedValue, setSelectedValue] = useState(""); // 상태 설정

    // Listbox 선택 변경 핸들러
    const handleListboxChange = (event) => {
      const value = event.target.value;
      setSelectedValue(value); // 상태 업데이트
      console.log("선택된 값:", value); // 콘솔에 출력
    };

    return (
        <div>
            {/* <NavBarHeader2
                overrides={{
                    ...overrides,
                    "Listbox Component": {
                        ...getOverrideProps(overrides, "Listbox Component"),
                        children: (
                            <select
                            style={{ width: "100%", height: "100%" }}
                            onChange={handleListboxChange}
                            >
                            <option value="Option 1">Option 1</option>
                            <option value="Option 2">Option 2</option>
                            <option value="Option 3">Option 3</option>
                            </select>
                        ),
                    },
                    Home: {
                        onClick: () => {
                            alert('Home Clicked!');
                            console.log('Home clicked');
                        }
                    }
                }}  
            /> */}
            <Flex direction="row">
                <SideBar />
            </Flex>
        </div>
    );
}

export default Console;