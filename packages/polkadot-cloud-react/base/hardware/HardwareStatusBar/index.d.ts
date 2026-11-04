import { ComponentBase } from "../../../utils/types";
import { FunctionComponent, SVGProps } from "react";
import "@polkadot-cloud/core/css/base/hardware/HardwareStatusBar/index.css";
export type HardwareStatusBarProps = ComponentBase & {
    show?: boolean;
    help?: {
        helpKey: string;
        handleHelp: (key: string) => void;
    };
    inProgress: boolean;
    text: string;
    Icon: FunctionComponent<SVGProps<SVGSVGElement>>;
    handleCancel?: () => void;
    handleDone?: () => void;
    t: {
        tDone: string;
        tCancel: string;
    };
};
/**
 * @name HardwareStatusBar
 * @description A status bar for hardware wallet import process.
 */
export declare const HardwareStatusBar: ({ handleCancel, handleDone, show, help, Icon, inProgress, style, t: { tDone, tCancel }, text, }: HardwareStatusBarProps) => import("react/jsx-runtime").JSX.Element;
