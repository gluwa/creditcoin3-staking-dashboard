import { ComponentBaseWithClassName } from "../../utils/types";
import "@polkadot-cloud/core/css/buttons/ButtonPrimaryInvert/index.css";
import { ButtonCommonProps, ButtonIconProps } from "../types";
export type ButtonPrimaryInvertProps = ComponentBaseWithClassName & ButtonIconProps & ButtonCommonProps & {
    colorSecondary?: boolean;
    lg?: boolean;
    text: string;
};
/**
 * @name ButtonPrimaryInvert
 * @description Invert primary button style.
 */
export declare const ButtonPrimaryInvert: ({ colorSecondary, disabled, grow, iconLeft, iconRight, iconTransform, lg, marginLeft, marginRight, marginX, className, style, text, onClick, onMouseOver, onMouseMove, onMouseOut, }: ButtonPrimaryInvertProps) => import("react/jsx-runtime").JSX.Element;
