export var defaultExtensionsContext = {
    checkingInjectedWeb3: false,
    extensionsStatus: {},
    setExtensionStatus: function (id, status) { },
    removeExtensionStatus: function (id) { },
    extensionInstalled: function (id) { return false; },
    extensionCanConnect: function (id) { return false; },
    extensionHasFeature: function (id, feature) { return false; },
};
