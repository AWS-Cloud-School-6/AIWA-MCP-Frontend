/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { ButtonProps, FlexProps, IconProps, TextProps, ViewProps } from "@aws-amplify/ui-react";
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
export declare type YourVPCsOverridesProps = {
    YourVPCs?: PrimitiveOverrideProps<ViewProps>;
    "Your VPCs \uC798\uD588\uB294\uB370 ? \u314B; \uB354 \uB178\uB825\uD574"?: PrimitiveOverrideProps<TextProps>;
    Button39062329?: PrimitiveOverrideProps<ButtonProps>;
    Button39101971?: PrimitiveOverrideProps<FlexProps>;
    Vector?: PrimitiveOverrideProps<IconProps>;
} & EscapeHatchProps;
export declare type YourVPCsProps = React.PropsWithChildren<Partial<ViewProps> & {
    overrides?: YourVPCsOverridesProps | undefined | null;
}>;
export default function YourVPCs(props: YourVPCsProps): React.ReactElement;
