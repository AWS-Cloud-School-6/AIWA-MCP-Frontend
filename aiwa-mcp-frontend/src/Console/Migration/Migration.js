import React, { useState, useEffect } from "react";
import { Button, Flex, Heading } from "@aws-amplify/ui-react";
import NavBar from "../NavBar/NavBar";
import SidebarConsole from "../SideBar/SidebarConsole";
import { NotificationContainer } from "react-notifications";
import axios from "axios";

function Migration() {
    const [selectedProvider, setSelectedProvider] = useState(null);
    const [isSuccess, setIsSuccess] = useState(false);
    const [userEmail, setUserEmail] = useState("");

    // 사용자 이메일 가져오기
    useEffect(() => {
        // 예시: localStorage에서 사용자 이메일 가져오기
        const email = localStorage.getItem("user_email") || "unknown@example.com";
        setUserEmail(email);
    }, []);

    const handleSelectProvider = (provider) => {
        console.log("Selected provider in Migration:", provider);
        setSelectedProvider(provider);
    };

    const handleBedrockChange = async () => {
        if (!selectedProvider) {
            alert("Please select a provider first.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:5000/bedrock/api/username", {
                user_email: userEmail,
                platform: selectedProvider,
            });

            if (response.status === 200) {
                alert("Bedrock change completed successfully!");
                setIsSuccess(true); // 성공 시 Terraform Apply 버튼 활성화
            }
        } catch (error) {
            console.error("Error during Bedrock change:", error);
            alert("Failed to change Bedrock. Please try again.");
        }
    };

    const handleTerraformApply = async () => {
        if (!selectedProvider) {
            alert("Please select a provider first.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:5000/bedrock/api/confirm", {
                user_email: userEmail,
                platform: selectedProvider,
            });

            if (response.status === 200) {
                alert("Terraform applied successfully!");
            }
        } catch (error) {
            console.error("Error during Terraform apply:", error);
            alert("Failed to apply Terraform. Please try again.");
        }
    };

    return (
        <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
            <NavBar />
            <NotificationContainer />
            <Flex direction="row" className="console-content" style={{ flexGrow: 1 }}>
                <SidebarConsole onSelectProvider={handleSelectProvider} />
                <div style={{ padding: "20px", flexGrow: 1 }}>
                    <Heading level={4}>Migration Actions</Heading>

                    {/* 사용자 이메일 표시 */}
                    <p style={{ marginBottom: "20px" }}>
                        Logged in as: <strong>{userEmail}</strong>
                    </p>

                    {/* 플랫폼 선택 버튼 */}
                    <div style={{ marginBottom: "20px" }}>
                        <p>Select a Provider:</p>
                        <Button
                            onClick={() => handleSelectProvider("AWS")}
                            variation={selectedProvider === "AWS" ? "primary" : "default"}
                            style={{ marginRight: "10px" }}
                        >
                            AWS
                        </Button>
                        <Button
                            onClick={() => handleSelectProvider("GCP")}
                            variation={selectedProvider === "GCP" ? "primary" : "default"}
                        >
                            GCP
                        </Button>
                    </div>

                    {/* 작업 버튼 */}
                    <div style={{ marginTop: "20px" }}>
                        <Button
                            onClick={handleBedrockChange}
                            variation="primary"
                            style={{ marginRight: "10px" }}
                        >
                            Bedrock Change
                        </Button>
                        <Button
                            onClick={handleTerraformApply}
                            variation="secondary"
                            disabled={!isSuccess} // Bedrock Change 성공 시에만 활성화
                        >
                            Terraform Apply
                        </Button>
                    </div>
                </div>
            </Flex>
        </div>
    );
}

export default Migration;