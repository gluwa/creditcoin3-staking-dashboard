import { ComponentBase } from "../../../utils/types";
import { ReactNode } from "react";
import "@polkadot-cloud/core/css/base/hardware/HardwareAddress/index.css";
export type HardwareAddressProps = ComponentBase & {
    address: string;
    index: number;
    initial: string;
    disableEditIfImported?: boolean;
    Identicon: ReactNode;
    renameHandler: (address: string, newName: string) => void;
    existsHandler: (address: string) => boolean;
    openRemoveHandler: (address: string) => void;
    openConfirmHandler: (address: string, index: number) => void;
    t: {
        tImport: string;
        tRemove: string;
    };
};
/**
 * @name HardwareAddress
 * @description An editable and importable address UI for hardware wallets.
 */
export declare const HardwareAddress: ({ address, index, initial, disableEditIfImported, Identicon, existsHandler, renameHandler, openConfirmHandler, openRemoveHandler, t: { tImport, tRemove }, }: HardwareAddressProps) => import("react/jsx-runtime").JSX.Element;
