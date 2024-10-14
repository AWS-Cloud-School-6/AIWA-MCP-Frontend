/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { FlexProps, TextProps, ViewProps } from "@aws-amplify/ui-react";
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
export declare type VpccreateOverridesProps = {
    Vpccreate?: PrimitiveOverrideProps<ViewProps>;
    Input40133407?: PrimitiveOverrideProps<FlexProps>;
    Input401314520?: PrimitiveOverrideProps<FlexProps>;
    "VPC Create"?: PrimitiveOverrideProps<TextProps>;
    "Frame 4375"?: PrimitiveOverrideProps<FlexProps>;
    button?: PrimitiveOverrideProps<FlexProps>;
    "Enter VPC name"?: PrimitiveOverrideProps<TextProps>;
    "Enter CIDR"?: PrimitiveOverrideProps<TextProps>;
} & EscapeHatchProps;
export declare type VpccreateProps = React.PropsWithChildren<Partial<ViewProps> & {
    overrides?: VpccreateOverridesProps | undefined | null;
}>;
export default function Vpccreate(props: VpccreateProps): React.ReactElement;
