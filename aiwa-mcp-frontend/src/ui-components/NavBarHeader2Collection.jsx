/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import NavBarHeader2 from "./NavBarHeader2";
import { getOverrideProps } from "./utils";
import { Collection } from "@aws-amplify/ui-react";
export default function NavBarHeader2Collection(props) {
  const { items, overrideItems, overrides, ...rest } = props;
  return (
    <Collection
      type="list"
      direction="column"
      justifyContent="left"
      items={items || []}
      {...getOverrideProps(overrides, "NavBarHeader2Collection")}
      {...rest}
    >
      {(item, index) => (
        <NavBarHeader2
          key={item.id}
          {...(overrideItems && overrideItems({ item, index }))}
        ></NavBarHeader2>
      )}
    </Collection>
  );
}
