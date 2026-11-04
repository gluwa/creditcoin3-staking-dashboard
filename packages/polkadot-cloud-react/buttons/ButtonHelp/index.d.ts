import { ComponentBaseWithClassName } from "../../utils/types";
import { ButtonCommonProps } from "../types";
import "@polkadot-cloud/core/css/buttons/ButtonHelp/index.css";
export type ButtonHelpProps = ComponentBaseWithClassName & ButtonCommonProps & {
    background?: "primary" | "secondary" | "none";
    outline?: boolean;
};
/**
 * @name ButtonHelp
 * @description Help button used throughout dashboard apps.
 */
export declare const ButtonHelp: ({ disabled, marginLeft, marginRight, marginX, className, style, onClick, onMouseOver, onMouseMove, onMouseOut, outline, background, }: ButtonHelpProps) => import("react/jsx-runtime").JSX.Element;
