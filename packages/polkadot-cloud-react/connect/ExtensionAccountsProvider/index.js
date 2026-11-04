var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useEffect, useRef, useState } from "react";
import { localStorageOrDefault, setStateWithRef } from "@polkadot-cloud/utils";
import { defaultExtensionAccountsContext } from "./defaults";
import { extensionIsLocal, removeFromLocalExtensions } from "./utils";
import { useImportExtension } from "./useImportExtension";
import { useExtensions } from "../ExtensionsProvider/useExtensions";
import { useEffectIgnoreInitial } from "../../base/hooks/useEffectIgnoreInitial";
import { initPolkadotSnap } from "./snap";
export var ExtensionAccountsContext = createContext(defaultExtensionAccountsContext);
export var ExtensionAccountsProvider = function (_a) {
    var children = _a.children, network = _a.network, ss58 = _a.ss58, dappName = _a.dappName, activeAccount = _a.activeAccount, setActiveAccount = _a.setActiveAccount, onExtensionEnabled = _a.onExtensionEnabled;
    var _b = useImportExtension(), handleImportExtension = _b.handleImportExtension, getActiveExtensionAccount = _b.getActiveExtensionAccount, connectActiveExtensionAccount = _b.connectActiveExtensionAccount;
    var _c = useExtensions(), extensionsStatus = _c.extensionsStatus, setExtensionStatus = _c.setExtensionStatus, removeExtensionStatus = _c.removeExtensionStatus, checkingInjectedWeb3 = _c.checkingInjectedWeb3, extensionHasFeature = _c.extensionHasFeature;
    var _d = useState([]), extensionAccounts = _d[0], setExtensionAccounts = _d[1];
    var extensionAccountsRef = useRef(extensionAccounts);
    var _e = useState("unsynced"), extensionAccountsSynced = _e[0], setExtensionAccountsSynced = _e[1];
    var _f = useState([]), extensionsInitialised = _f[0], setExtensionsInitialised = _f[1];
    var extensionsInitialisedRef = useRef(extensionsInitialised);
    var unsubs = useRef({});
    var maybeSetActiveAccount = function (address) {
        if (typeof setActiveAccount === "function")
            setActiveAccount(address !== null && address !== void 0 ? address : null);
    };
    var maybeOnExtensionEnabled = function (id) {
        if (typeof onExtensionEnabled === "function")
            onExtensionEnabled(id);
    };
    var connectToAccount = function (account) {
        var _a;
        maybeSetActiveAccount((_a = account === null || account === void 0 ? void 0 : account.address) !== null && _a !== void 0 ? _a : null);
    };
    var connectActiveExtensions = function () { return __awaiter(void 0, void 0, void 0, function () {
        var extensionKeys, total, activeWalletAccount, i;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    extensionKeys = Object.keys(extensionsStatus);
                    if (!extensionKeys.length)
                        return [2 ];
                    return [4 , handleExtensionAdapters(extensionKeys)];
                case 1:
                    _b.sent();
                    total = (_a = extensionKeys === null || extensionKeys === void 0 ? void 0 : extensionKeys.length) !== null && _a !== void 0 ? _a : 0;
                    activeWalletAccount = null;
                    i = 0;
                    extensionKeys.forEach(function (id) { return __awaiter(void 0, void 0, void 0, function () {
                        var isLocal, enable, extension_1, handleAccounts_1, accounts, unsub, err_1;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    i++;
                                    isLocal = extensionIsLocal(id !== null && id !== void 0 ? id : "0");
                                    if (!(!id || !isLocal)) return [3 , 1];
                                    updateInitialisedExtensions(id ||
                                        "unknown_extension_".concat(extensionsInitialisedRef.current.length + 1));
                                    return [3 , 7];
                                case 1:
                                    _a.trys.push([1, 6, , 7]);
                                    enable = window.injectedWeb3[id].enable;
                                    return [4 , enable(dappName)];
                                case 2:
                                    extension_1 = _a.sent();
                                    if (!(extension_1 !== undefined)) return [3 , 5];
                                    handleAccounts_1 = function (a) {
                                        var _a = handleImportExtension(id, extensionAccountsRef.current, extension_1, a, forgetAccounts, {
                                            network: network,
                                            ss58: ss58,
                                        }), newAccounts = _a.newAccounts, meta = _a.meta;
                                        if (newAccounts.length)
                                            if (!activeWalletAccount)
                                                activeWalletAccount = getActiveExtensionAccount({ network: network, ss58: ss58 }, newAccounts);
                                        if (i === total && !activeAccount) {
                                            var activeAccountRemoved = (activeWalletAccount === null || activeWalletAccount === void 0 ? void 0 : activeWalletAccount.address) !== meta.removedActiveAccount &&
                                                meta.removedActiveAccount !== null;
                                            if (!activeAccountRemoved) {
                                                connectActiveExtensionAccount(activeWalletAccount, connectToAccount);
                                            }
                                        }
                                        addExtensionAccount(newAccounts);
                                        updateInitialisedExtensions(id);
                                    };
                                    if (!!extensionHasFeature(id, "subscribeAccounts")) return [3 , 4];
                                    return [4 , extension_1.accounts.get()];
                                case 3:
                                    accounts = _a.sent();
                                    handleAccounts_1(accounts);
                                    return [3 , 5];
                                case 4:
                                    unsub = extension_1.accounts.subscribe(function (accounts) {
                                        if (accounts)
                                            handleAccounts_1(accounts);
                                    });
                                    addToUnsubscribe(id, unsub);
                                    _a.label = 5;
                                case 5: return [3 , 7];
                                case 6:
                                    err_1 = _a.sent();
                                    handleExtensionError(id, String(err_1));
                                    return [3 , 7];
                                case 7: return [2 ];
                            }
                        });
                    }); });
                    return [2 ];
            }
        });
    }); };
    var connectExtensionAccounts = function (id) { return __awaiter(void 0, void 0, void 0, function () {
        var extensionKeys, exists, enable, extension_2, handleAccounts_2, accounts, unsub, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    extensionKeys = Object.keys(extensionsStatus);
                    exists = extensionKeys.find(function (key) { return key === id; }) || undefined;
                    if (!!exists) return [3 , 1];
                    updateInitialisedExtensions("unknown_extension_".concat(extensionsInitialisedRef.current.length + 1));
                    return [3 , 10];
                case 1: 
                return [4 , handleExtensionAdapters([id])];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    _a.trys.push([3, 9, , 10]);
                    enable = window.injectedWeb3[id].enable;
                    return [4 , enable(dappName)];
                case 4:
                    extension_2 = _a.sent();
                    if (!(extension_2 !== undefined)) return [3 , 8];
                    maybeOnExtensionEnabled(id);
                    handleAccounts_2 = function (a) {
                        var _a = handleImportExtension(id, extensionAccountsRef.current, extension_2, a, forgetAccounts, { network: network, ss58: ss58 }), newAccounts = _a.newAccounts, meta = _a.meta;
                        if (!activeAccount) {
                            var activeExtensionAccount = getActiveExtensionAccount({ network: network, ss58: ss58 }, newAccounts);
                            if ((activeExtensionAccount === null || activeExtensionAccount === void 0 ? void 0 : activeExtensionAccount.address) !== meta.removedActiveAccount &&
                                meta.removedActiveAccount !== null)
                                connectActiveExtensionAccount(activeExtensionAccount, connectToAccount);
                        }
                        addExtensionAccount(newAccounts);
                        updateInitialisedExtensions(id);
                    };
                    if (!!extensionHasFeature(id, "subscribeAccounts")) return [3 , 6];
                    return [4 , extension_2.accounts.get()];
                case 5:
                    accounts = _a.sent();
                    handleAccounts_2(accounts);
                    return [3 , 7];
                case 6:
                    unsub = extension_2.accounts.subscribe(function (accounts) {
                        if (accounts)
                            handleAccounts_2(accounts);
                    });
                    addToUnsubscribe(id, unsub);
                    _a.label = 7;
                case 7: return [2 , true];
                case 8: return [3 , 10];
                case 9:
                    err_2 = _a.sent();
                    handleExtensionError(id, String(err_2));
                    return [3 , 10];
                case 10: return [2 , false];
            }
        });
    }); };
    var handleExtensionError = function (id, err) {
        if (err.startsWith("Error")) {
            removeFromLocalExtensions(id);
            if (err.substring(0, 17) === "NotInstalledError") {
                removeExtensionStatus(id);
            }
            else {
                setExtensionStatus(id, "not_authenticated");
            }
        }
        updateInitialisedExtensions(id);
    };
    var handleExtensionAdapters = function (extensionKeys) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!extensionKeys.find(function (id) { return id === "metamask-polkadot-snap"; })) return [3 , 2];
                    return [4 , initPolkadotSnap({
                            networkName: network,
                            addressPrefix: ss58,
                        })];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2: return [2 ];
            }
        });
    }); };
    var forgetAccounts = function (forget) {
        if (forget.length) {
            var _loop_1 = function (address) {
                if (extensionAccountsRef.current.find(function (a) { return a.address === address; })) {
                    var unsub = unsubs.current[address];
                    if (unsub) {
                        unsub();
                        delete unsubs.current[address];
                    }
                }
            };
            for (var _i = 0, forget_1 = forget; _i < forget_1.length; _i++) {
                var address = forget_1[_i].address;
                _loop_1(address);
            }
            setStateWithRef(__spreadArray([], extensionAccountsRef.current, true).filter(function (a) { return forget.find(function (s) { return s.address === a.address; }) === undefined; }), setExtensionAccounts, extensionAccountsRef);
            if (activeAccount) {
                if (forget.find(function (_a) {
                    var address = _a.address;
                    return address === activeAccount;
                }) !== undefined)
                    maybeSetActiveAccount(null);
            }
        }
    };
    var updateInitialisedExtensions = function (id) {
        if (!extensionsInitialisedRef.current.includes(id)) {
            setStateWithRef(__spreadArray([], extensionsInitialisedRef.current, true).concat(id), setExtensionsInitialised, extensionsInitialisedRef);
        }
    };
    var addExtensionAccount = function (a) {
        setStateWithRef(__spreadArray([], extensionAccountsRef.current, true).concat(a), setExtensionAccounts, extensionAccountsRef);
    };
    var addToUnsubscribe = function (id, unsub) {
        unsubs.current[id] = unsub;
    };
    var unsubscribe = function () {
        Object.values(unsubs.current).forEach(function (unsub) {
            unsub();
        });
    };
    useEffect(function () {
        if (!checkingInjectedWeb3 && extensionAccountsSynced === "unsynced") {
            unsubscribe();
            setStateWithRef([], setExtensionAccounts, extensionAccountsRef);
            setStateWithRef([], setExtensionsInitialised, extensionsInitialisedRef);
            if (Object.keys(extensionsStatus).length) {
                var localExtensions = localStorageOrDefault("active_extensions", [], true);
                if (Object.keys(extensionsStatus).length && localExtensions.length) {
                    setExtensionAccountsSynced("syncing");
                    connectActiveExtensions();
                }
                else
                    setExtensionAccountsSynced("synced");
            }
        }
        return function () { return unsubscribe(); };
    }, [extensionsStatus, checkingInjectedWeb3, extensionAccountsSynced]);
    useEffectIgnoreInitial(function () {
        setExtensionAccountsSynced("unsynced");
    }, [ss58]);
    useEffectIgnoreInitial(function () {
        if (!checkingInjectedWeb3 &&
            extensionsInitialised.length === Object.keys(extensionsStatus).length) {
            setExtensionAccountsSynced("synced");
        }
    }, [checkingInjectedWeb3, extensionsInitialised]);
    return (_jsx(ExtensionAccountsContext.Provider, { value: {
            connectExtensionAccounts: connectExtensionAccounts,
            extensionAccountsSynced: extensionAccountsSynced,
            forgetAccounts: forgetAccounts,
            extensionAccounts: extensionAccountsRef.current,
        }, children: children }));
};


