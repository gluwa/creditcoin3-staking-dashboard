import { ExtensionFeature } from "@polkadot-cloud/assets/types";
import { AnyJson } from "../../utils/types";
import type { FunctionComponent, SVGProps } from "react";
import { ExternalAccountAddedBy } from "../types";
export interface ExtensionsContextInterface {
    checkingInjectedWeb3: boolean;
    extensionsStatus: Record<string, ExtensionStatus>;
    setExtensionStatus: (id: string, status: ExtensionStatus) => void;
    removeExtensionStatus: (id: string) => void;
    extensionInstalled: (id: string) => boolean;
    extensionCanConnect: (id: string) => boolean;
    extensionHasFeature: (id: string, feature: ExtensionFeature) => boolean;
}
export interface ExtensionInjected extends ExtensionConfig {
    id: string;
    enable: (n: string) => Promise<ExtensionInterface>;
}
export interface ExtensionInterface {
    accounts: {
        subscribe: {
            (a: {
                (b: ExtensionAccount[]): void;
            }): void;
        };
        get: () => Promise<ExtensionAccount[]>;
    };
    provider: AnyJson;
    metadata: AnyJson;
    signer: AnyJson;
}
export interface ExtensionAccount extends ExtensionMetadata {
    address: string;
    meta?: AnyJson;
    name: string;
    signer?: AnyJson;
}
export interface ExtensionConfig {
    id: string;
    title: string;
    icon: FunctionComponent<SVGProps<SVGSVGElement> & {
        title?: string | undefined;
    }>;
    url: string;
}
export interface ExtensionMetadata {
    addedBy?: ExternalAccountAddedBy;
    source: string;
}
export type ExtensionStatus = "installed" | "not_authenticated" | "connected";
