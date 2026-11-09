import { ComponentBaseWithClassName } from "../../utils/types";
import { IconDefinition, IconProp } from "@fortawesome/fontawesome-svg-core";
import "@polkadot-cloud/core/css/textfield/index.css";
type TextfieldProps = ComponentBaseWithClassName & {
    value: string;
    onChange: (val: string) => void;
    placeholder?: string;
    autoFocus?: boolean;
    disabled?: boolean;
    name?: string;
    inputType?: "email" | "password" | "text";
    iconLeft?: {
        icon: IconProp | IconDefinition;
        iconTransform?: string;
        action?: () => void;
    };
    iconRight?: {
        icon: IconProp | IconDefinition;
        iconTransform?: string;
        action?: () => void;
    };
};
export declare const Textfield: ({ onChange, className, placeholder, autoFocus, name, disabled, inputType, value, iconLeft, iconRight, }: TextfieldProps) => import("react/jsx-runtime").JSX.Element;
export {};
