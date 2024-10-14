/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { ButtonProps, FlexProps, IconProps, TextProps, ViewProps } from "@aws-amplify/ui-react";
import { ListboxComponentProps } from "./ListboxComponent";
import { SyntheticEvent } from "react";
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
export declare type NavBarHeader2OverridesProps = {
    NavBarHeader2?: PrimitiveOverrideProps<FlexProps>;
    LeftFrame?: PrimitiveOverrideProps<FlexProps>;
    "Amplify Mark"?: PrimitiveOverrideProps<ViewProps>;
    Union?: PrimitiveOverrideProps<IconProps>;
    Home?: PrimitiveOverrideProps<TextProps>;
    Network?: PrimitiveOverrideProps<TextProps>;
    EC2?: PrimitiveOverrideProps<TextProps>;
    RightFrame?: PrimitiveOverrideProps<ViewProps>;
    SearchService?: PrimitiveOverrideProps<ViewProps>;
    "Listbox Component"?: ListboxComponentProps;
    NavBar?: PrimitiveOverrideProps<FlexProps>;
    actions?: PrimitiveOverrideProps<ViewProps>;
    Button39493466?: PrimitiveOverrideProps<ButtonProps>;
    Button39493467?: PrimitiveOverrideProps<ButtonProps>;
} & EscapeHatchProps;
export declare type NavBarHeader2Props = React.PropsWithChildren<Partial<FlexProps> & {
    EC2?: (event: SyntheticEvent) => void;
    frame4377?: React.ReactNode;
    search?: (event: SyntheticEvent) => void;
    sfs?: React.ReactNode;
    test?: React.ReactNode;
} & {
    overrides?: NavBarHeader2OverridesProps | undefined | null;
}>;
export default function NavBarHeader2(props: NavBarHeader2Props): React.ReactElement;
