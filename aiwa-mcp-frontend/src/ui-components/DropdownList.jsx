/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { getOverrideProps } from "./utils";
import HoverState from "./HoverState";
import { Flex } from "@aws-amplify/ui-react";
export default function DropdownList(props) {
  const { overrides, ...rest } = props;
  return (
    <Flex
      gap="1px"
      direction="column"
      width="280px"
      height="unset"
      justifyContent="center"
      alignItems="center"
      overflow="hidden"
      position="relative"
      boxShadow="0px 4px 14px rgba(0, 0, 0, 0.10000000149011612)"
      borderRadius="8px"
      padding="0px 0px 0px 0px"
      {...getOverrideProps(overrides, "DropdownList")}
      {...rest}
    >
      <HoverState
        width="unset"
        height="44px"
        display="block"
        gap="unset"
        alignItems="unset"
        justifyContent="unset"
        overflow="hidden"
        shrink="0"
        alignSelf="stretch"
        position="relative"
        padding="0px 0px 0px 0px"
        backgroundColor="rgba(255,255,255,1)"
        property1="Default"
        {...getOverrideProps(overrides, "Item 1")}
      ></HoverState>
      <HoverState
        width="unset"
        height="44px"
        display="block"
        gap="unset"
        alignItems="unset"
        justifyContent="unset"
        overflow="hidden"
        shrink="0"
        alignSelf="stretch"
        position="relative"
        padding="0px 0px 0px 0px"
        backgroundColor="rgba(255,255,255,1)"
        property1="Default"
        {...getOverrideProps(overrides, "Item 2")}
      ></HoverState>
      <HoverState
        width="unset"
        height="44px"
        display="block"
        gap="unset"
        alignItems="unset"
        justifyContent="unset"
        overflow="hidden"
        shrink="0"
        alignSelf="stretch"
        position="relative"
        padding="0px 0px 0px 0px"
        backgroundColor="rgba(255,255,255,1)"
        property1="Default"
        {...getOverrideProps(overrides, "Item 3")}
      ></HoverState>
      <HoverState
        width="unset"
        height="44px"
        display="block"
        gap="unset"
        alignItems="unset"
        justifyContent="unset"
        overflow="hidden"
        shrink="0"
        alignSelf="stretch"
        position="relative"
        padding="0px 0px 0px 0px"
        backgroundColor="rgba(255,255,255,1)"
        property1="Default"
        {...getOverrideProps(overrides, "Item 4")}
      ></HoverState>
    </Flex>
  );
}
