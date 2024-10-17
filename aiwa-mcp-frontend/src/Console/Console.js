import { useState } from "react";
import { Flex, View, Text, Icon, TextField, Button } from '@aws-amplify/ui-react';
import { ListboxComponent, NavBarHeader2, SideBar } from '../ui-components';
import React from 'react';
import { getOverrideProps } from "../ui-components/utils";
import axios from 'axios'; 
import { useUserContext } from '../UserContext';
import NavBar from './NavBar/NavBar';
import { API_URL } from '../index';



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

function MyPage() {
  const [email, setEmail] = useState('');
  const [access_key, setaccess_key] = useState('');
  const [secret_key, setsecret_key] = useState('');

  const { currentUser } = useUserContext();

  const handleSubmit = async () => {
    try {
      const response = await axios.post(API_URL + '/members/update-credentials', {
        email: currentUser?.id, // Use the current user's email from context
        access_key,
        secret_key
      });    
      console.log('API 응답:', response.data);
      alert('키 성공적으로 제출');
    } catch (error) {
      if (error.response && error.response.status === 500) {
        console.error('서버 내부 오류:', error.response.data);
        alert('서버 내부 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      } else if (error.code === 'ERR_BAD_RESPONSE') {
        console.error('잘못된 응답:', error.message);
        alert('서버로부터 잘못된 응답을 받았습니다. 관리자에게 문의해주세요.');
      } else {
        console.error('API 요청 실패:', error);
        alert('키 제출 실패: ' + error.message);
      }
    }
  };

    // const handleSubmit = () => {
    //     const mykey = {
    //         "access_key": access_key,
    //         "secret_key": secret_key
    //     }
    //     axios.post(API_URL + '/members/update-credentials', mykey)
    //     .then((response) => {
    //         console.log(response);
    //     }).catch((error) => {
    //         console.log(error);
    //     });
    // }

  return (
    <Flex direction="column" padding="2rem">
      <Text fontSize="2xl" fontWeight="bold" marginBottom="1rem">마이페이지</Text>
      {/* Import useUserContext at the top of the file */}
      {/* import { useUserContext } from '../UserContext'; */}
      
      {/* Inside the MyPage component, add: */}
      {/* const { currentUser } = useUserContext(); */}
      
      <Text
        fontWeight="bold"
        marginBottom="1rem"
      >
        이메일: {currentUser?.id || 'Loading...'}
      </Text>
      <TextField
        label="Access Key"
        placeholder="Access Key를 입력하세요"
        value={access_key}
        onChange={(e) => setaccess_key(e.target.value)}
        marginBottom="1rem"
      />
      <TextField
        label="Secret Key"
        placeholder="Secret Key를 입력하세요"
        type="password"
        value={secret_key}
        onChange={(e) => setsecret_key(e.target.value)}
        marginBottom="1rem"
      />
      <Button onClick={handleSubmit}>제출</Button>
    </Flex>
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
            <NavBar />
                <Flex direction="row">
                    <SideBar />
                    <MyPage /> {/* 마이페이지 컴포넌트 추가 */}
                </Flex>
        </div>
    );
}

export default Console;
