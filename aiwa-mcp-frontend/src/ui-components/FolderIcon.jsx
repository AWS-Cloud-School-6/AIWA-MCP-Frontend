/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { getOverrideProps } from "./utils";
import { Flex, Icon, Text, View } from "@aws-amplify/ui-react";
export default function FolderIcon(props) {
  const { overrides, ...rest } = props;
  return (
    <Flex
      gap="14px"
      direction="column"
      width="unset"
      height="unset"
      justifyContent="flex-start"
      alignItems="flex-start"
      position="relative"
      border="2px SOLID rgba(0,0,0,0.06)"
      borderRadius="8px"
      padding="38px 18px 38px 18px"
      {...getOverrideProps(overrides, "FolderIcon")}
      {...rest}
    >
      <View
        width="150px"
        height="100px"
        display="block"
        gap="unset"
        alignItems="unset"
        justifyContent="unset"
        shrink="0"
        position="relative"
        padding="0px 0px 0px 0px"
        {...getOverrideProps(overrides, "Frame 10")}
      >
        <Icon
          width="136px"
          height="100px"
          viewBox={{ minX: 0, minY: 0, width: 136, height: 100 }}
          paths={[
            {
              d: "M0 7C0 3.13401 3.13401 0 7 0L29.0071 0C31.6585 0 34.0823 1.49802 35.2681 3.86951L39.7319 12.7972C40.9177 15.1687 43.3415 16.6667 45.9929 16.6667L129 16.6667C132.866 16.6667 136 19.8007 136 23.6667L136 93C136 96.866 132.866 100 129 100L7 100C3.13401 100 0 96.866 0 93L0 7Z",
              fill: "rgba(180,202,255,1)",
              fillRule: "nonzero",
            },
          ]}
          display="block"
          gap="unset"
          alignItems="unset"
          justifyContent="unset"
          position="absolute"
          top="0px"
          left="14px"
          {...getOverrideProps(overrides, "Rectangle 2")}
        ></Icon>
        <Icon
          width="150px"
          height="100px"
          viewBox={{ minX: 0, minY: 0, width: 150, height: 100 }}
          paths={[
            {
              d: "M0 7C0 3.13401 3.13401 0 7 0L29.0071 0C31.6585 0 34.0823 1.49802 35.2681 3.86951L39.7319 12.7972C40.9177 15.1687 43.3415 16.6667 45.9929 16.6667L143 16.6667C146.866 16.6667 150 19.8007 150 23.6667L150 93C150 96.866 146.866 100 143 100L7 100C3.13401 100 0 96.866 0 93L0 7Z",
              fill: "rgba(73,127,255,1)",
              fillRule: "nonzero",
            },
          ]}
          display="block"
          gap="unset"
          alignItems="unset"
          justifyContent="unset"
          position="absolute"
          top="0px"
          left="0px"
          {...getOverrideProps(overrides, "Rectangle 1")}
        ></Icon>
      </View>
      <Flex
        gap="12px"
        direction="column"
        width="unset"
        height="unset"
        justifyContent="flex-start"
        alignItems="flex-start"
        shrink="0"
        alignSelf="stretch"
        position="relative"
        padding="0px 8px 0px 8px"
        {...getOverrideProps(overrides, "Frame 4")}
      >
        <Flex
          gap="26px"
          direction="row"
          width="unset"
          height="unset"
          justifyContent="flex-start"
          alignItems="flex-start"
          shrink="0"
          position="relative"
          padding="0px 0px 0px 0px"
          {...getOverrideProps(overrides, "Frame 3")}
        >
          <Text
            fontFamily="Inter"
            fontSize="18px"
            fontWeight="600"
            color="rgba(26,26,26,1)"
            lineHeight="18px"
            textAlign="left"
            display="block"
            direction="column"
            justifyContent="unset"
            letterSpacing="0.03px"
            width="unset"
            height="unset"
            gap="unset"
            alignItems="unset"
            shrink="0"
            position="relative"
            padding="0px 0px 0px 0px"
            whiteSpace="pre-wrap"
            children="Photos"
            {...getOverrideProps(overrides, "Photos")}
          ></Text>
        </Flex>
      </Flex>
    </Flex>
  );
}
