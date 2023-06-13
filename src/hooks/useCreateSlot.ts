import React, { ReactElement, ReactNode } from "react";

export const useCreateSlot = ({ children }: { children: ReactNode }) => {
  return function (props: any) {
    return React.cloneElement(children as ReactElement, props);
  };
};
export const useCreateSlotById = (
  { children, idx }: { children: ReactNode, idx: number }
) => {

  return function (props: any) {
    return React.cloneElement(React.Children.toArray(children)[idx] as ReactElement, props);
  };
};
