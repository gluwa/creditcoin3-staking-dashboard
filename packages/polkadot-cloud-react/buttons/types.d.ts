import { IconDefinition, IconProp } from "@fortawesome/fontawesome-svg-core";
import { MouseEvent } from "react";
import { ComponentBaseWithClassName } from "../utils/types";
export interface ButtonCommonProps {
    disabled?: boolean;
    marginLeft?: boolean;
    marginRight?: boolean;
    marginX?: boolean;
    grow?: boolean;
    onClick?: (e?: MouseEvent<HTMLButtonElement>) => void;
    onMouseOver?: (e?: MouseEvent<HTMLButtonElement>) => void;
    onMouseMove?: (e?: MouseEvent<HTMLButtonElement>) => void;
    onMouseOut?: (e?: MouseEvent<HTMLButtonElement>) => void;
}
export interface ButtonIconProps {
    iconLeft?: IconProp | IconDefinition;
    iconRight?: IconProp | IconDefinition;
    iconTransform?: string;
}
export type ButtonType = "help" | "mono" | "monoInvert" | "option" | "primary" | "primaryInvert" | "secondary" | "submit" | "submitInvert" | "tab" | "tertiary" | "text";
export type ButtonProps = ComponentBaseWithClassName & ButtonIconProps & ButtonCommonProps & {
    type?: ButtonType;
} & ({
    colorSecondary?: boolean;
    lg?: boolean;
    pulse?: boolean;
    content?: boolean;
    text: string;
} | {
    background?: "primary" | "secondary" | "none";
    outline?: boolean;
} | {
    active?: boolean;
    title: string;
    badge?: string | number;
});
