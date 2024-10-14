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
import ListBoxtitle from "./ListBoxtitle";
import { Icon, View } from "@aws-amplify/ui-react";
import PlaceholderText from "./PlaceholderText";
import DropdownList from "./DropdownList";
export default function ListboxComponent(props) {
  const { overrides: overridesProp, ...rest } = props;
  const variants = [
    {
      overrides: {
        "ListBox title": {},
        ListBoxBG: {},
        Chevron: {
          paths: [
            {
              d: "M0.494975 -0.494975C0.221608 -0.768342 -0.221608 -0.768342 -0.494975 -0.494975C-0.768342 -0.221608 -0.768342 0.221608 -0.494975 0.494975L0.494975 -0.494975ZM5 5L4.50503 5.49498C4.77839 5.76834 5.22161 5.76834 5.49498 5.49498L5 5ZM10.495 0.494975C10.7683 0.221608 10.7683 -0.221608 10.495 -0.494975C10.2216 -0.768342 9.77839 -0.768342 9.50503 -0.494975L10.495 0.494975ZM-0.494975 0.494975L4.50503 5.49498L5.49498 4.50503L0.494975 -0.494975L-0.494975 0.494975ZM5.49498 5.49498L10.495 0.494975L9.50503 -0.494975L4.50503 4.50503L5.49498 5.49498Z",
              stroke: "rgba(0,0,0,0.64)",
              fillRule: "nonzero",
              strokeLinejoin: "round",
              strokeWidth: 1,
            },
          ],
        },
        "Placeholder Text": {},
        "ListBox Main": {},
        "Dropdown List": {},
        "Clip List": {},
        ListboxComponent: {},
      },
      variantValues: { property1: "Default" },
    },
    {
      overrides: {
        "ListBox title": {},
        ListBoxBG: {},
        Chevron: {
          top: "55%",
          bottom: "36.67%",
          left: "92.14%",
          right: "4.29%",
          transform: "rotate(-180deg)",
        },
        "Placeholder Text": {},
        "ListBox Main": {},
        "Dropdown List": {
          height: "unset",
          backgroundColor: "rgba(255,255,255,1)",
        },
        "Clip List": {},
        ListboxComponent: {},
      },
      variantValues: { property1: "Variant2" },
    },
    {
      overrides: {
        "ListBox title": {},
        ListBoxBG: {},
        Chevron: {},
        "Placeholder Text": {},
        "ListBox Main": {},
        "Dropdown List": { height: "unset", top: "8px" },
        "Clip List": { height: "69px", bottom: "66.44%" },
        ListboxComponent: { overflow: "hidden" },
      },
      variantValues: { property1: "Variant3" },
    },
    {
      overrides: {
        "ListBox title": {},
        ListBoxBG: {},
        Chevron: {},
        "Placeholder Text": {},
        "ListBox Main": {},
        "Dropdown List": { height: "unset", top: "-36px" },
        "Clip List": { height: "69px", bottom: "66.44%" },
        ListboxComponent: {},
      },
      variantValues: { property1: "Variant4" },
    },
    {
      overrides: {
        "ListBox title": {},
        ListBoxBG: {},
        Chevron: {},
        "Placeholder Text": {},
        "ListBox Main": {},
        "Dropdown List": { height: "unset", top: "-80px" },
        "Clip List": { height: "69px", bottom: "66.44%" },
        ListboxComponent: {},
      },
      variantValues: { property1: "Variant5" },
    },
    {
      overrides: {
        "ListBox title": {},
        ListBoxBG: {},
        Chevron: {},
        "Placeholder Text": {},
        "ListBox Main": {},
        "Dropdown List": { height: "unset", top: "-124px" },
        "Clip List": { height: "69px", bottom: "66.44%" },
        ListboxComponent: {},
      },
      variantValues: { property1: "Variant6" },
    },
  ];
  const overrides = mergeVariantsAndOverrides(
    getOverridesFromVariants(variants, props),
    overridesProp || {}
  );
  return (
    <View
      width="308px"
      height="289px"
      display="block"
      gap="unset"
      alignItems="unset"
      justifyContent="unset"
      position="relative"
      padding="0px 0px 0px 0px"
      {...getOverrideProps(overrides, "ListboxComponent")}
      {...rest}
    >
      <ListBoxtitle
        width="280px"
        height="20px"
        display="block"
        gap="unset"
        alignItems="unset"
        justifyContent="unset"
        position="absolute"
        top="0%"
        bottom="93.08%"
        left="4.55%"
        right="4.55%"
        padding="0px 0px 0px 0px"
        {...getOverrideProps(overrides, "ListBox title")}
      ></ListBoxtitle>
      <View
        padding="0px 0px 0px 0px"
        width="280px"
        height="60px"
        display="block"
        gap="unset"
        alignItems="unset"
        justifyContent="unset"
        position="absolute"
        top="9.69%"
        bottom="69.55%"
        left="4.55%"
        right="4.55%"
        {...getOverrideProps(overrides, "ListBox Main")}
      >
        <View
          width="280px"
          height="60px"
          display="block"
          gap="unset"
          alignItems="unset"
          justifyContent="unset"
          position="absolute"
          top="0%"
          bottom="0%"
          left="0%"
          right="0%"
          boxShadow="0px 4px 14px rgba(0, 0, 0, 0.10000000149011612)"
          borderRadius="8px"
          padding="0px 0px 0px 0px"
          backgroundColor="rgba(255,255,255,1)"
          {...getOverrideProps(overrides, "ListBoxBG")}
        ></View>
        <Icon
          width="10px"
          height="5px"
          viewBox={{ minX: 0, minY: 0, width: 10, height: 5 }}
          paths={[
            {
              d: "M0.494975 -0.494975C0.221608 -0.768342 -0.221608 -0.768342 -0.494975 -0.494975C-0.768342 -0.221608 -0.768342 0.221608 -0.494975 0.494975L0.494975 -0.494975ZM5 5L4.50503 5.49498C4.77839 5.76834 5.22161 5.76834 5.49498 5.49498L5 5ZM10.495 0.494975C10.7683 0.221608 10.7683 -0.221608 10.495 -0.494975C10.2216 -0.768342 9.77839 -0.768342 9.50503 -0.494975L10.495 0.494975ZM-0.494975 0.494975L4.50503 5.49498L5.49498 4.50503L0.494975 -0.494975L-0.494975 0.494975ZM5.49498 5.49498L10.495 0.494975L9.50503 -0.494975L4.50503 4.50503L5.49498 5.49498Z",
              stroke: "rgba(0,0,0,0.8)",
              fillRule: "nonzero",
              strokeLinejoin: "round",
              strokeWidth: 1,
            },
          ]}
          display="block"
          gap="unset"
          alignItems="unset"
          justifyContent="unset"
          position="absolute"
          top="46.67%"
          bottom="45%"
          left="88.57%"
          right="7.86%"
          transformOrigin="top left"
          transform="rotate(0deg)"
          {...getOverrideProps(overrides, "Chevron")}
        ></Icon>
        <PlaceholderText
          width="184px"
          height="20px"
          display="block"
          gap="unset"
          alignItems="unset"
          justifyContent="unset"
          position="absolute"
          top="33.33%"
          bottom="33.33%"
          left="5.71%"
          right="28.57%"
          padding="0px 0px 0px 0px"
          {...getOverrideProps(overrides, "Placeholder Text")}
        ></PlaceholderText>
      </View>
      <View
        width="308px"
        height="261px"
        display="block"
        gap="unset"
        alignItems="unset"
        justifyContent="unset"
        overflow="hidden"
        position="absolute"
        top="9.69%"
        bottom="0%"
        left="0%"
        right="0%"
        padding="0px 0px 0px 0px"
        {...getOverrideProps(overrides, "Clip List")}
      >
        <DropdownList
          display="flex"
          gap="1px"
          direction="column"
          width="280px"
          height="1px"
          justifyContent="center"
          alignItems="center"
          overflow="hidden"
          position="absolute"
          top="68px"
          left="4.55%"
          right="4.55%"
          boxShadow="0px 4px 14px rgba(0, 0, 0, 0.10000000149011612)"
          borderRadius="8px"
          padding="0px 0px 0px 0px"
          {...getOverrideProps(overrides, "Dropdown List")}
        ></DropdownList>
      </View>
    </View>
  );
}
