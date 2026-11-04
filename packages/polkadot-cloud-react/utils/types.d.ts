import { ReactNode, CSSProperties } from "react";
export interface ComponentBase {
    children?: ReactNode;
    style?: CSSProperties;
}
export type VoidFn = () => void;
export type ComponentBaseWithClassName = ComponentBase & {
    className?: string;
};
export type AnyApi = any;
export type Any = any;
export type AnyJson = any;
export type AnyFunction = any;
export type AnyObject = any;
export type MaybeAddress = string | null;
export type MaybeString = string | null;
export type HPosition = HPositionLR & "center";
export type HPositionLR = "left" | "right";
export type DisplayFor = "default" | "modal" | "canvas";
