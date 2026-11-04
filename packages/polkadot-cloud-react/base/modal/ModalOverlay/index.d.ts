import { ModalAnimationProps } from "../types";
import "@polkadot-cloud/core/css/base/modal/ModalOverlay/index.css";
export type ModalOverlayProps = ModalAnimationProps & {
    blur?: string;
};
/**
 * @name ModalOverlay
 * @summary Modal overlay wrapper, providing a transparent background to overlaying content.
 */
export declare const ModalOverlay: ({ children, blur, ...rest }: ModalOverlayProps) => import("react/jsx-runtime").JSX.Element;
