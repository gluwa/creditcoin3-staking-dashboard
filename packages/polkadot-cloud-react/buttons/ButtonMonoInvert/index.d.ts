import { ComponentBaseWithClassName } from "../../utils/types";
import "@polkadot-cloud/core/css/buttons/ButtonMonoInvert/index.css";
import { ButtonCommonProps, ButtonIconProps } from "../types";
export type ButtonMonoProps = ComponentBaseWithClassName & ButtonIconProps & ButtonCommonProps & {
    lg?: boolean;
    text: string;
};
/**
 * @name ButtonMonoInvert
 * @description Inverted monotone button style used within the main interface of dashboards.
 */
export declare const ButtonMonoInvert: ({ disabled, grow, iconLeft, iconRight, iconTransform, lg, marginLeft, marginRight, marginX, className, style, text, onClick, onMouseOver, onMouseMove, onMouseOut, }: ButtonMonoProps) => import("react/jsx-runtime").JSX.Element;
