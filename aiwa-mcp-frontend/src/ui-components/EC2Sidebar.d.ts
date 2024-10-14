/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { MyIconProps } from "./MyIcon";
import { FlexProps, TextProps } from "@aws-amplify/ui-react";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type EC2SidebarOverridesProps = {
    EC2Sidebar?: PrimitiveOverrideProps<FlexProps>;
    "Frame 32138832022"?: PrimitiveOverrideProps<FlexProps>;
    "Frame 32138832023"?: PrimitiveOverrideProps<FlexProps>;
    "Frame 414"?: PrimitiveOverrideProps<FlexProps>;
    "Frame 322"?: PrimitiveOverrideProps<FlexProps>;
    icon38832026?: PrimitiveOverrideProps<FlexProps>;
    MyIcon38832027?: MyIconProps;
    label38832028?: PrimitiveOverrideProps<TextProps>;
    Section38832029?: PrimitiveOverrideProps<FlexProps>;
    label38832030?: PrimitiveOverrideProps<TextProps>;
    link38832031?: PrimitiveOverrideProps<FlexProps>;
    icon38832032?: PrimitiveOverrideProps<FlexProps>;
    MyIcon38832033?: MyIconProps;
    label38832034?: PrimitiveOverrideProps<TextProps>;
    link38832035?: PrimitiveOverrideProps<FlexProps>;
    icon38832036?: PrimitiveOverrideProps<FlexProps>;
    MyIcon38832037?: MyIconProps;
    label38832038?: PrimitiveOverrideProps<TextProps>;
    link38832039?: PrimitiveOverrideProps<FlexProps>;
    icon38832040?: PrimitiveOverrideProps<FlexProps>;
    MyIcon38832041?: MyIconProps;
    label38832042?: PrimitiveOverrideProps<TextProps>;
    Section38832043?: PrimitiveOverrideProps<FlexProps>;
    label38832044?: PrimitiveOverrideProps<TextProps>;
    link38832045?: PrimitiveOverrideProps<FlexProps>;
    icon38832046?: PrimitiveOverrideProps<FlexProps>;
    MyIcon38832047?: MyIconProps;
    label38832048?: PrimitiveOverrideProps<TextProps>;
    link38832065?: PrimitiveOverrideProps<FlexProps>;
    icon38832066?: PrimitiveOverrideProps<FlexProps>;
    MyIcon38832067?: MyIconProps;
    label38832068?: PrimitiveOverrideProps<TextProps>;
    link38832120?: PrimitiveOverrideProps<FlexProps>;
    icon38832121?: PrimitiveOverrideProps<FlexProps>;
    MyIcon38832122?: MyIconProps;
    label38832123?: PrimitiveOverrideProps<TextProps>;
} & EscapeHatchProps;
export declare type EC2SidebarProps = React.PropsWithChildren<Partial<FlexProps> & {
    property1?: "Default";
} & {
    overrides?: EC2SidebarOverridesProps | undefined | null;
}>;
export default function EC2Sidebar(props: EC2SidebarProps): React.ReactElement;
