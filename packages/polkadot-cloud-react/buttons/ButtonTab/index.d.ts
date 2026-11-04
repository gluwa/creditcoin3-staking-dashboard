import { ComponentBaseWithClassName } from "../../utils/types";
import { ButtonCommonProps } from "../types";
import "@polkadot-cloud/core/css/buttons/ButtonTab/index.css";
export type ButtonTabProps = ComponentBaseWithClassName & ButtonCommonProps & {
    active?: boolean;
    title: string;
    badge?: string | number;
};
/**
 * @name ButtonTab
 * @description Tab button used throughout dashboard apps.
 */
export declare const ButtonTab: ({ disabled, className, style, active, title, badge, onClick, onMouseOver, onMouseMove, onMouseOut, }: ButtonTabProps) => import("react/jsx-runtime").JSX.Element;
