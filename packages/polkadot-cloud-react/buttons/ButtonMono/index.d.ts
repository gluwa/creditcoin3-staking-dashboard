import { ComponentBaseWithClassName } from "../../utils/types";
import "@polkadot-cloud/core/css/buttons/ButtonMono/index.css";
import { ButtonCommonProps, ButtonIconProps } from "../types";
export type ButtonMonoProps = ComponentBaseWithClassName & ButtonIconProps & ButtonCommonProps & {
    lg?: boolean;
    text: string;
};
/**
 * @name ButtonMono
 * @description Monotone button style used within the main interface of dashboards.
 */
export declare const ButtonMono: ({ disabled, grow, iconLeft, iconRight, iconTransform, lg, marginLeft, marginRight, marginX, className, style, text, onClick, onMouseOver, onMouseMove, onMouseOut, }: ButtonMonoProps) => import("react/jsx-runtime").JSX.Element;
