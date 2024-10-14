/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { getOverrideProps } from "./utils";
import { Flex, Text, View } from "@aws-amplify/ui-react";
export default function Vpccreate(props) {
  const { overrides, ...rest } = props;
  return (
    <View
      width="1014px"
      height="831px"
      display="block"
      gap="unset"
      alignItems="unset"
      justifyContent="unset"
      overflow="hidden"
      position="relative"
      padding="0px 0px 0px 0px"
      backgroundColor="rgba(255,255,255,1)"
      {...getOverrideProps(overrides, "Vpccreate")}
      {...rest}
    >
      <Flex
        width="306px"
        height="28px"
        {...getOverrideProps(overrides, "Input40133407")}
      ></Flex>
      <Flex
        width="306px"
        height="28px"
        {...getOverrideProps(overrides, "Input401314520")}
      ></Flex>
      <Text
        fontFamily="Inter"
        fontSize="40px"
        fontWeight="700"
        color="rgba(0,0,0,1)"
        lineHeight="20px"
        textAlign="left"
        display="block"
        direction="column"
        justifyContent="unset"
        width="356px"
        height="115px"
        gap="unset"
        alignItems="unset"
        position="absolute"
        top="58px"
        left="70px"
        padding="0px 0px 0px 0px"
        whiteSpace="pre-wrap"
        children="VPC Create"
        {...getOverrideProps(overrides, "VPC Create")}
      ></Text>
      <Flex
        gap="10px"
        direction="column"
        width="127px"
        height="unset"
        justifyContent="flex-start"
        alignItems="flex-start"
        position="absolute"
        top="392px"
        left="59px"
        padding="10px 10px 10px 10px"
        {...getOverrideProps(overrides, "Frame 4375")}
      >
        <Flex
          width="unset"
          height="44px"
          {...getOverrideProps(overrides, "button")}
        ></Flex>
      </Flex>
      <Text
        fontFamily="Inter"
        fontSize="12px"
        fontWeight="500"
        color="rgba(184,184,184,1)"
        lineHeight="20px"
        textAlign="left"
        display="block"
        direction="column"
        justifyContent="unset"
        width="167px"
        height="22px"
        gap="unset"
        alignItems="unset"
        position="absolute"
        top="216px"
        left="70px"
        padding="0px 0px 0px 0px"
        whiteSpace="pre-wrap"
        children="Enter VPC name"
        {...getOverrideProps(overrides, "Enter VPC name")}
      ></Text>
      <Text
        fontFamily="Inter"
        fontSize="12px"
        fontWeight="500"
        color="rgba(184,184,184,1)"
        lineHeight="20px"
        textAlign="left"
        display="block"
        direction="column"
        justifyContent="unset"
        width="167px"
        height="22px"
        gap="unset"
        alignItems="unset"
        position="absolute"
        top="309px"
        left="70px"
        padding="0px 0px 0px 0px"
        whiteSpace="pre-wrap"
        children="Enter CIDR"
        {...getOverrideProps(overrides, "Enter CIDR")}
      ></Text>
    </View>
  );
}
