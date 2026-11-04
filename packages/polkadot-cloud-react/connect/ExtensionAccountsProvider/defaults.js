export var defaultExtensionAccountsContext = {
    connectExtensionAccounts: function () { return Promise.resolve(false); },
    forgetAccounts: function (a) { },
    extensionAccountsSynced: "unsynced",
    extensionAccounts: [],
};
export var defaultHandleImportExtension = {
    newAccounts: [],
    meta: {
        removedActiveAccount: null,
    },
};


