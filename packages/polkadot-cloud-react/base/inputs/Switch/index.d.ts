import "@polkadot-cloud/core/css/base/inputs/Switch/index.css";
import { ComponentBaseWithClassName } from "../../../utils/types";
export type SwitchPrimaryProps = ComponentBaseWithClassName & {
    type?: "primary" | "secondary" | "mono" | "monoInvert";
    size?: "sm" | "lg" | "xl";
    onColor?: string;
    isOn?: boolean;
    disabled?: boolean;
    handleToggle?: () => void;
};
export declare const Switch: ({ type, size, isOn, disabled, handleToggle, onColor, className, }: SwitchPrimaryProps) => import("react/jsx-runtime").JSX.Element;
