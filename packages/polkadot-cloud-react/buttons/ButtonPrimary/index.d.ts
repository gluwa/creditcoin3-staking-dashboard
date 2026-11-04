import { ComponentBaseWithClassName } from "../../utils/types";
import "@polkadot-cloud/core/css/buttons/ButtonPrimary/index.css";
import { ButtonCommonProps, ButtonIconProps } from "../types";
export type ButtonPrimaryProps = ComponentBaseWithClassName & ButtonIconProps & ButtonCommonProps & {
    colorSecondary?: boolean;
    lg?: boolean;
    text: string;
};
/**
 * @name ButtonPrimary
 * @description Primary button style used within the main interface of dashboards.
 */
export declare const ButtonPrimary: ({ colorSecondary, disabled, grow, iconLeft, iconRight, iconTransform, lg, marginLeft, marginRight, marginX, className, style, text, onClick, onMouseOver, onMouseMove, onMouseOut, }: ButtonPrimaryProps) => import("react/jsx-runtime").JSX.Element;
