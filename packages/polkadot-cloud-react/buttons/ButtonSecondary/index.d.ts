import { ComponentBaseWithClassName } from "../../utils/types";
import "@polkadot-cloud/core/css/buttons/ButtonSecondary/index.css";
import { ButtonCommonProps, ButtonIconProps } from "../types";
export type ButtonSecondaryProps = ComponentBaseWithClassName & ButtonIconProps & ButtonCommonProps & {
    lg?: boolean;
    text: string;
};
/**
 * @name ButtonSecondary
 * @description Secondary button style used within the main interface of dashboards.
 */
export declare const ButtonSecondary: ({ disabled, grow, iconLeft, iconRight, iconTransform, lg, marginLeft, marginRight, marginX, className, style, text, onClick, onMouseOver, onMouseMove, onMouseOut, }: ButtonSecondaryProps) => import("react/jsx-runtime").JSX.Element;
