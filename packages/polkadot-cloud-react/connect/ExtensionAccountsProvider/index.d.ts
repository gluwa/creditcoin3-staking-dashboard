/// <reference types="react" />
import { ExtensionAccountsContextInterface, ExtensionAccountsProviderProps } from "./types";
export declare const ExtensionAccountsContext: import("react").Context<ExtensionAccountsContextInterface>;
export declare const ExtensionAccountsProvider: ({ children, network, ss58, dappName, activeAccount, setActiveAccount, onExtensionEnabled, }: ExtensionAccountsProviderProps) => import("react/jsx-runtime").JSX.Element;
