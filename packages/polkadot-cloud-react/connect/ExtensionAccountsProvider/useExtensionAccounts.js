import { useContext } from "react";
import { ExtensionAccountsContext } from ".";
export var useExtensionAccounts = function () { return useContext(ExtensionAccountsContext); };
