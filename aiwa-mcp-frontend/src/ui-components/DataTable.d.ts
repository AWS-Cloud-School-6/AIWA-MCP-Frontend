/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { FlexProps, IconProps, ViewProps } from "@aws-amplify/ui-react";
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
export declare type DataTableOverridesProps = {
    DataTable?: PrimitiveOverrideProps<ViewProps>;
    Customer39047131?: PrimitiveOverrideProps<ViewProps>;
    Customer39047132?: PrimitiveOverrideProps<ViewProps>;
    Customer39047133?: PrimitiveOverrideProps<ViewProps>;
    Customer39047134?: PrimitiveOverrideProps<ViewProps>;
    Customer39047135?: PrimitiveOverrideProps<ViewProps>;
    Customer39047136?: PrimitiveOverrideProps<ViewProps>;
    Customer39047137?: PrimitiveOverrideProps<ViewProps>;
    Customer39047138?: PrimitiveOverrideProps<ViewProps>;
    Customer39047139?: PrimitiveOverrideProps<ViewProps>;
    Customer39047140?: PrimitiveOverrideProps<ViewProps>;
    Customer39047141?: PrimitiveOverrideProps<ViewProps>;
    Customer39047142?: PrimitiveOverrideProps<ViewProps>;
    Customer39047143?: PrimitiveOverrideProps<ViewProps>;
    Customer39047144?: PrimitiveOverrideProps<ViewProps>;
    Customer39047145?: PrimitiveOverrideProps<ViewProps>;
    Customer39047146?: PrimitiveOverrideProps<ViewProps>;
    Customer39047147?: PrimitiveOverrideProps<ViewProps>;
    Customer39047148?: PrimitiveOverrideProps<ViewProps>;
    Customer39047149?: PrimitiveOverrideProps<ViewProps>;
    Customer39047150?: PrimitiveOverrideProps<ViewProps>;
    Rectangle?: PrimitiveOverrideProps<ViewProps>;
    "Table pagination"?: PrimitiveOverrideProps<FlexProps>;
    "Rectangle 49"?: PrimitiveOverrideProps<ViewProps>;
    "Frame 1"?: PrimitiveOverrideProps<FlexProps>;
    checkbox?: PrimitiveOverrideProps<ViewProps>;
    "column-header39047156"?: PrimitiveOverrideProps<FlexProps>;
    "column-header39047157"?: PrimitiveOverrideProps<FlexProps>;
    "column-header39047158"?: PrimitiveOverrideProps<FlexProps>;
    "column-header39047159"?: PrimitiveOverrideProps<FlexProps>;
    "column-header39047160"?: PrimitiveOverrideProps<FlexProps>;
    "column-header39047161"?: PrimitiveOverrideProps<FlexProps>;
    "column-header39047162"?: PrimitiveOverrideProps<FlexProps>;
    button39047163?: PrimitiveOverrideProps<FlexProps>;
    button39047164?: PrimitiveOverrideProps<FlexProps>;
    input?: PrimitiveOverrideProps<FlexProps>;
    "Vector 1"?: PrimitiveOverrideProps<IconProps>;
    "Vector 2"?: PrimitiveOverrideProps<IconProps>;
} & EscapeHatchProps;
export declare type DataTableProps = React.PropsWithChildren<Partial<ViewProps> & {
    overrides?: DataTableOverridesProps | undefined | null;
}>;
export default function DataTable(props: DataTableProps): React.ReactElement;
