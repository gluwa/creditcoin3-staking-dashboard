import { ComponentBaseWithClassName } from "../../utils/types";
import "@polkadot-cloud/core/css/buttons/ButtonOption/index.css";
import { ButtonCommonProps } from "../types";
export type ButtonOptionProps = ComponentBaseWithClassName & ButtonCommonProps & {
    content?: boolean;
};
/**
 * @name ButtonOption
 * @description Option button for different action.
 */
export declare const ButtonOption: ({ children, className, style, disabled, content, onClick, onMouseOver, onMouseMove, onMouseOut, }: ButtonOptionProps) => import("react/jsx-runtime").JSX.Element;
