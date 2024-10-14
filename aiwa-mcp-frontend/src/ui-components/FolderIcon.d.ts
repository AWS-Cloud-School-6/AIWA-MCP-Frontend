/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { FlexProps, IconProps, TextProps, ViewProps } from "@aws-amplify/ui-react";
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
export declare type FolderIconOverridesProps = {
    FolderIcon?: PrimitiveOverrideProps<FlexProps>;
    "Frame 10"?: PrimitiveOverrideProps<ViewProps>;
    "Rectangle 2"?: PrimitiveOverrideProps<IconProps>;
    "Rectangle 1"?: PrimitiveOverrideProps<IconProps>;
    "Frame 4"?: PrimitiveOverrideProps<FlexProps>;
    "Frame 3"?: PrimitiveOverrideProps<FlexProps>;
    Photos?: PrimitiveOverrideProps<TextProps>;
} & EscapeHatchProps;
export declare type FolderIconProps = React.PropsWithChildren<Partial<FlexProps> & {
    overrides?: FolderIconOverridesProps | undefined | null;
}>;
export default function FolderIcon(props: FolderIconProps): React.ReactElement;
