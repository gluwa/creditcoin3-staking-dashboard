import { ExtensionAccount } from "../ExtensionsProvider/types";
import { ExternalAccount } from "../types";
export declare const getActiveAccountLocal: (network: string, ss58: number) => any;
export declare const addToLocalExtensions: (id: string) => void;
export declare const getInExternalAccounts: (accounts: ExtensionAccount[], network: string) => ExternalAccount[];
export declare const getLocalExternalAccounts: (network?: string) => ExternalAccount[];
export declare const extensionIsLocal: (id: string) => boolean;
export declare const removeFromLocalExtensions: (id: string) => void;
