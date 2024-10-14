/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { ListBoxtitleProps } from "./ListBoxtitle";
import { IconProps, ViewProps } from "@aws-amplify/ui-react";
import { PlaceholderTextProps } from "./PlaceholderText";
import { DropdownListProps } from "./DropdownList";
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
export declare type ListboxComponentOverridesProps = {
    ListboxComponent?: PrimitiveOverrideProps<ViewProps>;
    "ListBox title"?: ListBoxtitleProps;
    "ListBox Main"?: PrimitiveOverrideProps<ViewProps>;
    ListBoxBG?: PrimitiveOverrideProps<ViewProps>;
    Chevron?: PrimitiveOverrideProps<IconProps>;
    "Placeholder Text"?: PlaceholderTextProps;
    "Clip List"?: PrimitiveOverrideProps<ViewProps>;
    "Dropdown List"?: DropdownListProps;
} & EscapeHatchProps;
export declare type ListboxComponentProps = React.PropsWithChildren<Partial<ViewProps> & {
    property1?: "Default" | "Variant2" | "Variant3" | "Variant4" | "Variant5" | "Variant6";
} & {
    overrides?: ListboxComponentOverridesProps | undefined | null;
}>;
export default function ListboxComponent(props: ListboxComponentProps): React.ReactElement;
