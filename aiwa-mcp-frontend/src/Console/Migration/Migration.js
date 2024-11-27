import { useState } from "react";
import { Flex, Heading } from "@aws-amplify/ui-react";
import NavBar from "../NavBar/NavBar";
import SidebarConsole from "../SideBar/SidebarConsole";
import { NotificationContainer } from 'react-notifications';
import { MyPage } from '../Console';

function Migration() {
    const [selectedProvider, setSelectedProvider] = useState(null);

    // SidebarConsole에서 사용하는 onSelectProvider prop에 맞춰 핸들러 정의
    const handleSelectProvider = (provider) => {
        console.log("Selected provider in Migration:", provider); // 디버깅용 로그
        setSelectedProvider(provider);
    };

    return (
        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
            <NavBar />
            <NotificationContainer />
            <Flex direction="row" className="console-content">
                <SidebarConsole onSelectProvider={handleSelectProvider} />
                {selectedProvider && <MyPage provider={selectedProvider} />}
                    <Heading level={4}>Migration List</Heading>
            </Flex>

            
        </div>
    );
}

export default Migration;
  