/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { HoverStateProps } from "./HoverState";
import { FlexProps } from "@aws-amplify/ui-react";
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
export declare type DropdownListOverridesProps = {
    DropdownList?: PrimitiveOverrideProps<FlexProps>;
    "Item 1"?: HoverStateProps;
    "Item 2"?: HoverStateProps;
    "Item 3"?: HoverStateProps;
    "Item 4"?: HoverStateProps;
} & EscapeHatchProps;
export declare type DropdownListProps = React.PropsWithChildren<Partial<FlexProps> & {
    overrides?: DropdownListOverridesProps | undefined | null;
}>;
export default function DropdownList(props: DropdownListProps): React.ReactElement;
