import { ComponentBaseWithClassName } from "../../utils/types";
import "@polkadot-cloud/core/css/buttons/ButtonSubmitInvert/index.css";
import { ButtonCommonProps, ButtonIconProps } from "../types";
export type ButtonSubmitInvertProps = ComponentBaseWithClassName & ButtonIconProps & ButtonCommonProps & {
    text: string;
    lg?: boolean;
};
/**
 * @name ButtonSubmitInvert
 * @description Invert submit button style used in modals.
 */
export declare const ButtonSubmitInvert: ({ disabled, grow, iconLeft, iconRight, iconTransform, marginLeft, marginRight, marginX, className, style, text, lg, onClick, onMouseOver, onMouseMove, onMouseOut, }: ButtonSubmitInvertProps) => import("react/jsx-runtime").JSX.Element;
