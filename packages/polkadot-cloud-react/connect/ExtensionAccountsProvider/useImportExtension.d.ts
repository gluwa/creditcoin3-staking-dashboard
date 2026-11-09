import type { ExtensionAccount, ExtensionInterface } from "../ExtensionsProvider/types";
import { ImportedAccount } from "../types";
import { HandleImportExtension } from "./types";
import { AnyFunction } from "../../utils/types";
export declare const useImportExtension: () => {
    handleImportExtension: (id: string, currentAccounts: ExtensionAccount[], extension: ExtensionInterface, newAccounts: ExtensionAccount[], forget: (a: ImportedAccount[]) => void, { network, ss58, }: {
        network: string;
        ss58: number;
    }) => HandleImportExtension;
    getActiveExtensionAccount: ({ network, ss58, }: {
        network: string;
        ss58: number;
    }, accounts: ImportedAccount[]) => ImportedAccount;
    connectActiveExtensionAccount: (account: ImportedAccount | null, callback: AnyFunction) => void;
};
