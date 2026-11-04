import { AnyJson, ComponentBase, ComponentBaseWithClassName, DisplayFor } from "../utils/types";
import { ReactElement, ReactNode } from "react";
export type EntryProps = ComponentBase & {
    mode: "light" | "dark";
    theme: string;
};
export type CardProps = ComponentBaseWithClassName & {
    children: ReactNode;
    animations?: AnyJson;
};
export type GridItemsAlignment = "flex-start" | "center" | "flex-end" | "stretch" | "baseline";
export type GridJustify = "flex-start" | "center" | "flex-end" | "space-between" | "space-around" | "space-evenly";
export type GridSizes = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export type GridProps = ComponentBaseWithClassName & {
    column?: boolean;
    row?: boolean;
    alignItems?: GridItemsAlignment;
    expanded?: boolean;
    justify?: GridJustify;
    lg?: GridSizes;
    md?: GridSizes;
    sm?: GridSizes;
};
export type LoaderProps = {
    type?: "cube" | "line" | "dots";
    text?: string;
};
export type SideProps = ComponentBase & {
    open: boolean;
    minimised: boolean;
    width?: string | number;
};
export type PageTitleProps = PageTitleTabsProps & {
    title?: string;
    button?: {
        title: string;
        onClick: () => void;
    };
};
export type PageTitleTabsProps = {
    sticky?: boolean;
    tabs?: Array<PageTitleTabProps>;
};
export type PageTitleTabProps = {
    sticky?: boolean;
    title: string;
    active: boolean;
    onClick: () => void;
    badge?: string | number;
};
export type RowProps = ComponentBase & {
    yMargin?: boolean;
};
export type RowSectionProps = ComponentBase & {
    vLast?: boolean;
    hLast?: boolean;
    secondary?: boolean;
};
export type TxProps = {
    margin?: boolean;
    label: string;
    name: string;
    notEnoughFunds: boolean;
    dangerMessage: string;
    SignerComponent: ReactElement;
    displayFor?: DisplayFor;
};
