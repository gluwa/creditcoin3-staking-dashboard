import { ComponentBaseWithClassName } from "../../utils/types";
import "@polkadot-cloud/core/css/buttons/ButtonText/index.css";
import { ButtonCommonProps, ButtonIconProps } from "../types";
export type ButtonMonoProps = ComponentBaseWithClassName & ButtonIconProps & ButtonCommonProps & {
    text: string;
};
/**
 * @name ButtonText
 * @description Plain button style used within the main interface of dashboards.
 */
export declare const ButtonText: ({ disabled, grow, iconLeft, iconRight, iconTransform, marginLeft, marginRight, marginX, className, style, text, onClick, onMouseOver, onMouseMove, onMouseOut, }: ButtonMonoProps) => import("react/jsx-runtime").JSX.Element;
