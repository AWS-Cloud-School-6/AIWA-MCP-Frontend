/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  getOverrideProps,
  getOverridesFromVariants,
  mergeVariantsAndOverrides,
} from "./utils";
import { Text, View } from "@aws-amplify/ui-react";
export default function HoverState(props) {
  const { overrides: overridesProp, ...rest } = props;
  const variants = [
    {
      overrides: { Item: {}, HoverState: {} },
      variantValues: { property1: "Default" },
    },
    {
      overrides: { Item: { fontWeight: "500" }, HoverState: {} },
      variantValues: { property1: "Variant2" },
    },
  ];
  const overrides = mergeVariantsAndOverrides(
    getOverridesFromVariants(variants, props),
    overridesProp || {}
  );
  return (
    <View
      width="280px"
      height="44px"
      display="block"
      gap="unset"
      alignItems="unset"
      justifyContent="unset"
      overflow="hidden"
      position="relative"
      padding="0px 0px 0px 0px"
      backgroundColor="rgba(255,255,255,1)"
      {...getOverrideProps(overrides, "HoverState")}
      {...rest}
    >
      <Text
        fontFamily="Montserrat"
        fontSize="16px"
        fontWeight="400"
        color="rgba(51,51,51,1)"
        lineHeight="19.503999710083008px"
        textAlign="left"
        display="block"
        direction="column"
        justifyContent="unset"
        width="unset"
        height="unset"
        gap="unset"
        alignItems="unset"
        position="absolute"
        top="12px"
        left="16px"
        padding="0px 0px 0px 0px"
        whiteSpace="pre-wrap"
        children="Item"
        {...getOverrideProps(overrides, "Item")}
      ></Text>
    </View>
  );
}
