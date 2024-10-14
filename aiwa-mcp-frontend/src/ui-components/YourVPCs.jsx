/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { getOverrideProps } from "./utils";
import { Button, Flex, Icon, Text, View } from "@aws-amplify/ui-react";
export default function YourVPCs(props) {
  const { overrides, ...rest } = props;
  return (
    <View
      width="1266px"
      height="75px"
      display="block"
      gap="unset"
      alignItems="unset"
      justifyContent="unset"
      position="relative"
      padding="0px 0px 0px 0px"
      {...getOverrideProps(overrides, "YourVPCs")}
      {...rest}
    >
      <Text
        fontFamily="Inter"
        fontSize="50px"
        fontWeight="700"
        color="rgba(0,0,0,1)"
        lineHeight="75px"
        textAlign="left"
        display="block"
        direction="column"
        justifyContent="unset"
        width="1266px"
        height="unset"
        gap="unset"
        alignItems="unset"
        position="absolute"
        top="0%"
        bottom="0%"
        left="0%"
        right="0%"
        padding="0px 0px 0px 0px"
        whiteSpace="pre-wrap"
        children="Your VPCs 잘했는데 ? ㅋ; 더 노력해"
        {...getOverrideProps(
          overrides,
          "Your VPCs \uC798\uD588\uB294\uB370 ? \u314B; \uB354 \uB178\uB825\uD574"
        )}
      ></Text>
      <Button
        width="142px"
        height="33px"
        position="absolute"
        top="23px"
        left="1124px"
        size="large"
        isDisabled={false}
        variation="primary"
        children="Create VPC"
        {...getOverrideProps(overrides, "Button39062329")}
      ></Button>
      <Flex
        gap="0"
        direction="row"
        width="51px"
        height="unset"
        justifyContent="center"
        alignItems="center"
        position="absolute"
        top="23px"
        left="903px"
        border="1px SOLID rgba(239,240,240,1)"
        borderRadius="5px"
        padding="8px 16px 8px 16px"
        {...getOverrideProps(overrides, "Button39101971")}
      >
        <Icon
          width="16px"
          height="16px"
          viewBox={{ minX: 0, minY: 0, width: 16, height: 16 }}
          paths={[
            {
              d: "M8 16C5.76667 16 3.875 15.225 2.325 13.675C0.775 12.125 0 10.2333 0 8C0 5.76667 0.775 3.875 2.325 2.325C3.875 0.775 5.76667 0 8 0C9.15 0 10.25 0.237666 11.3 0.713C12.35 1.18767 13.25 1.86667 14 2.75L14 1C14 0.716667 14.096 0.479 14.288 0.287C14.4793 0.0956668 14.7167 0 15 0C15.2833 0 15.5207 0.0956668 15.712 0.287C15.904 0.479 16 0.716667 16 1L16 6C16 6.28333 15.904 6.52067 15.712 6.712C15.5207 6.904 15.2833 7 15 7L10 7C9.71667 7 9.47933 6.904 9.288 6.712C9.096 6.52067 9 6.28333 9 6C9 5.71667 9.096 5.479 9.288 5.287C9.47933 5.09567 9.71667 5 10 5L13.2 5C12.6667 4.06667 11.9377 3.33333 11.013 2.8C10.0877 2.26667 9.08333 2 8 2C6.33333 2 4.91667 2.58333 3.75 3.75C2.58333 4.91667 2 6.33333 2 8C2 9.66667 2.58333 11.0833 3.75 12.25C4.91667 13.4167 6.33333 14 8 14C9.15 14 10.2127 13.6957 11.188 13.087C12.1627 12.479 12.8917 11.6667 13.375 10.65C13.4583 10.4667 13.596 10.3127 13.788 10.188C13.9793 10.0627 14.175 10 14.375 10C14.7583 10 15.046 10.1333 15.238 10.4C15.4293 10.6667 15.45 10.9667 15.3 11.3C14.6667 12.7167 13.6917 13.854 12.375 14.712C11.0583 15.5707 9.6 16 8 16Z",
              fill: "rgba(0,0,0,1)",
              fillRule: "nonzero",
            },
          ]}
          display="block"
          gap="unset"
          alignItems="unset"
          justifyContent="unset"
          shrink="0"
          position="relative"
          {...getOverrideProps(overrides, "Vector")}
        ></Icon>
      </Flex>
    </View>
  );
}
