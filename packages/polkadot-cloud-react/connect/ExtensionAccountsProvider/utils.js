import { localStorageOrDefault } from "@polkadot-cloud/utils";
import Keyring from "@polkadot/keyring";
export var getActiveAccountLocal = function (network, ss58) {
    var keyring = new Keyring();
    keyring.setSS58Format(ss58);
    var account = localStorageOrDefault("".concat(network, "_active_account"), null);
    if (account !== null) {
        account = keyring.addFromAddress(account).address;
    }
    return account;
};
export var addToLocalExtensions = function (id) {
    var localExtensions = localStorageOrDefault("active_extensions", [], true);
    if (Array.isArray(localExtensions)) {
        if (!localExtensions.includes(id)) {
            localExtensions.push(id);
            localStorage.setItem("active_extensions", JSON.stringify(localExtensions));
        }
    }
};
export var getInExternalAccounts = function (accounts, network) {
    var localExternalAccounts = getLocalExternalAccounts(network);
    return (localExternalAccounts.filter(function (a) { return (accounts || []).find(function (b) { return b.address === a.address; }) !== undefined; }) || []);
};
export var getLocalExternalAccounts = function (network) {
    var localAccounts = localStorageOrDefault("external_accounts", [], true);
    if (network) {
        localAccounts = localAccounts.filter(function (l) { return l.network === network; });
    }
    return localAccounts;
};
export var extensionIsLocal = function (id) {
    var localExtensions = localStorageOrDefault("active_extensions", [], true);
    var foundExtensionLocally = false;
    if (Array.isArray(localExtensions)) {
        foundExtensionLocally = localExtensions.find(function (l) { return l === id; }) !== undefined;
    }
    return foundExtensionLocally;
};
export var removeFromLocalExtensions = function (id) {
    var localExtensions = localStorageOrDefault("active_extensions", [], true);
    if (Array.isArray(localExtensions)) {
        localExtensions = localExtensions.filter(function (l) { return l !== id; });
        localStorage.setItem("active_extensions", JSON.stringify(localExtensions));
    }
};
