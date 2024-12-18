/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { FlexProps, TextProps } from "@aws-amplify/ui-react";
import { MyIconProps } from "./MyIcon";
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
export declare type SideBarOverridesProps = {
    SideBar?: PrimitiveOverrideProps<FlexProps>;
    "Frame 32139493355"?: PrimitiveOverrideProps<FlexProps>;
    "Frame 32139493356"?: PrimitiveOverrideProps<FlexProps>;
    Section39493363?: PrimitiveOverrideProps<FlexProps>;
    label39493364?: PrimitiveOverrideProps<TextProps>;
    link39493365?: PrimitiveOverrideProps<FlexProps>;
    icon39493366?: PrimitiveOverrideProps<FlexProps>;
    MyIcon39493367?: MyIconProps;
    label39493368?: PrimitiveOverrideProps<TextProps>;
    link39493369?: PrimitiveOverrideProps<FlexProps>;
    icon39493370?: PrimitiveOverrideProps<FlexProps>;
    MyIcon39493371?: MyIconProps;
    label39493372?: PrimitiveOverrideProps<TextProps>;
    link39493373?: PrimitiveOverrideProps<FlexProps>;
    icon39493374?: PrimitiveOverrideProps<FlexProps>;
    MyIcon39493375?: MyIconProps;
    label39493376?: PrimitiveOverrideProps<TextProps>;
    Section39493377?: PrimitiveOverrideProps<FlexProps>;
    label39493378?: PrimitiveOverrideProps<TextProps>;
    link38871055?: PrimitiveOverrideProps<FlexProps>;
    icon38871056?: PrimitiveOverrideProps<FlexProps>;
    MyIcon38871057?: MyIconProps;
    label38871058?: PrimitiveOverrideProps<TextProps>;
    link39493387?: PrimitiveOverrideProps<FlexProps>;
    icon39493388?: PrimitiveOverrideProps<FlexProps>;
    MyIcon39493389?: MyIconProps;
    label39493390?: PrimitiveOverrideProps<TextProps>;
} & EscapeHatchProps;
export declare type SideBarProps = React.PropsWithChildren<Partial<FlexProps> & {
    property1?: "Variant2";
} & {
    overrides?: SideBarOverridesProps | undefined | null;
}>;
export default function SideBar(props: SideBarProps): React.ReactElement;
