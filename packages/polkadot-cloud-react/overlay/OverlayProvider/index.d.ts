import { ReactNode } from "react";
import type { OverlayContextInterface } from "./types";
export declare const OverlayContext: import("react").Context<OverlayContextInterface>;
export declare const OverlayProvider: ({ children }: {
    children: ReactNode;
}) => import("react/jsx-runtime").JSX.Element;
