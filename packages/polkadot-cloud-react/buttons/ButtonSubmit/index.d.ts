import { ComponentBaseWithClassName } from "../../utils/types";
import "@polkadot-cloud/core/css/buttons/ButtonSubmit/index.css";
import { ButtonCommonProps, ButtonIconProps } from "../types";
export type ButtonSubmitProps = ComponentBaseWithClassName & ButtonIconProps & ButtonCommonProps & {
    colorSecondary?: boolean;
    text: string;
    lg?: boolean;
    pulse?: boolean;
};
/**
 * @name ButtonSubmit
 * @description Submit button style used within modals to submit transactions.
 */
export declare const ButtonSubmit: ({ colorSecondary, disabled, grow, iconLeft, iconRight, iconTransform, marginLeft, marginRight, marginX, className, style, text, lg, pulse, onClick, onMouseOver, onMouseMove, onMouseOut, }: ButtonSubmitProps) => import("react/jsx-runtime").JSX.Element;
