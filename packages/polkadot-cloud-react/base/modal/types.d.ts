import { ReactNode, RefObject } from "react";
import { ComponentBase, ComponentBaseWithClassName } from "../../utils/types";
import { AnimationProps } from "framer-motion";
export type ActionItemProps = ComponentBase & {
    text: string;
    toggled?: boolean;
    disabled?: boolean;
    onToggle?: (val: boolean) => void;
    inactive?: boolean;
    inlineButton?: ReactNode;
};
export type ModalPaddingProps = ComponentBase & {
    verticalOnly?: boolean;
    horizontalOnly?: boolean;
};
export type ModalCardProps = ComponentBaseWithClassName;
export type ModalNotesProps = ComponentBase & {
    withPadding?: boolean;
};
export type ModalWarningsProps = ComponentBase & {
    withMargin?: boolean;
};
export type ModalFixedTitleProps = ComponentBase & {
    withStyle?: boolean;
};
export type ModalSectionProps = ComponentBase & {
    type: "tab" | "carousel";
};
export type ModalScrollProps = ComponentBase & {
    size: string;
    ref: RefObject<HTMLDivElement>;
};
export type ModalAnimationProps = ComponentBase & AnimationProps;
export type ModalConnectItemProps = ComponentBase & {
    canConnect?: boolean;
};
export type CanvasScrollProps = ModalAnimationProps & {
    size?: "lg" | "xl";
    scroll?: boolean;
};
export type ModalContentProps = ModalAnimationProps & {
    canvas?: boolean;
};
