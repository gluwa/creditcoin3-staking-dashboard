import { ComponentBaseWithClassName } from "../../utils/types";
import "@polkadot-cloud/core/css/buttons/ButtonTertiary/index.css";
import { ButtonCommonProps, ButtonIconProps } from "../types";
export type ButtonTertiaryProps = ComponentBaseWithClassName & ButtonIconProps & ButtonCommonProps & {
    text: string;
};
/**
 * @name ButtonTertiary
 * @description Tertiary button style used within the main interface of dashboards.
 */
export declare const ButtonTertiary: ({ disabled, grow, iconLeft, iconRight, iconTransform, marginLeft, marginRight, marginX, className, style, text, onClick, onMouseOver, onMouseMove, onMouseOut, }: ButtonTertiaryProps) => import("react/jsx-runtime").JSX.Element;
