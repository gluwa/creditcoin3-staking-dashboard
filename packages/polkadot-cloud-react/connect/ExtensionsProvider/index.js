var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
import { jsx as _jsx } from "react/jsx-runtime";
import { setStateWithRef } from "@polkadot-cloud/utils";
import { Extensions, ExtensionsArray } from "@polkadot-cloud/assets/extensions";
import { useEffect, useRef, useState, createContext } from "react";
import { defaultExtensionsContext } from "./defaults";
import { polkadotSnapAvailable } from "./utils";
export var ExtensionsContext = createContext(defaultExtensionsContext);
export var ExtensionsProvider = function (_a) {
    var children = _a.children;
    var _b = useState(true), checkingInjectedWeb3 = _b[0], setCheckingInjectedWeb3 = _b[1];
    var checkingInjectedWeb3Ref = useRef(checkingInjectedWeb3);
    var intervalInitialisedRef = useRef(false);
    var _c = useState({}), extensionsStatus = _c[0], setExtensionsStatus = _c[1];
    var extensionsStatusRef = useRef(extensionsStatus);
    var injectedWeb3Interval;
    var injectCounter = 0;
    var handleClearInterval = function (hasInjectedWeb3) {
        clearInterval(injectedWeb3Interval);
        handleSnapInjection(hasInjectedWeb3);
    };
    var handleSnapInjection = function (hasInjectedWeb3) { return __awaiter(void 0, void 0, void 0, function () {
        var snapAvailable;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 , polkadotSnapAvailable()];
                case 1:
                    snapAvailable = _a.sent();
                    if (hasInjectedWeb3 || snapAvailable)
                        setStateWithRef(getExtensionsStatus(snapAvailable), setExtensionsStatus, extensionsStatusRef);
                    setStateWithRef(false, setCheckingInjectedWeb3, checkingInjectedWeb3Ref);
                    return [2 ];
            }
        });
    }); };
    var setExtensionStatus = function (id, status) {
        var _a;
        setStateWithRef(__assign(__assign({}, extensionsStatusRef.current), (_a = {}, _a[id] = status, _a)), setExtensionsStatus, extensionsStatusRef);
    };
    var removeExtensionStatus = function (id) {
        var newExtensionsStatus = __assign({}, extensionsStatusRef.current);
        delete newExtensionsStatus[id];
        setStateWithRef(newExtensionsStatus, setExtensionsStatus, extensionsStatusRef);
    };
    var getExtensionsStatus = function (snapAvailable) {
        var injectedWeb3 = window.injectedWeb3;
        var newExtensionsStatus = __assign({}, extensionsStatus);
        if (snapAvailable)
            newExtensionsStatus["metamask-polkadot-snap"] = "installed";
        ExtensionsArray.forEach(function (e) {
            if (injectedWeb3[e.id] !== undefined) {
                newExtensionsStatus[e.id] = "installed";
            }
        });
        return newExtensionsStatus;
    };
    var extensionInstalled = function (id) {
        return extensionsStatus[id] !== undefined;
    };
    var extensionCanConnect = function (id) {
        return extensionInstalled(id) && extensionsStatus[id] !== "connected";
    };
    var extensionHasFeature = function (id, feature) {
        var features = Extensions[id].features;
        if (features === "*" || features.includes(feature))
            return true;
        else
            return false;
    };
    var checkEveryMs = 500;
    var totalChecks = 10;
    useEffect(function () {
        if (!intervalInitialisedRef.current) {
            intervalInitialisedRef.current = true;
            injectedWeb3Interval = setInterval(function () {
                if (injectCounter + 1 === totalChecks)
                    handleClearInterval(false);
                else {
                    var injectedWeb3 = (window === null || window === void 0 ? void 0 : window.injectedWeb3) || null;
                    if (injectedWeb3 !== null)
                        handleClearInterval(true);
                }
            }, checkEveryMs);
        }
        return function () { return clearInterval(injectedWeb3Interval); };
    });
    return (_jsx(ExtensionsContext.Provider, { value: {
            extensionsStatus: extensionsStatusRef.current,
            checkingInjectedWeb3: checkingInjectedWeb3Ref.current,
            setExtensionStatus: setExtensionStatus,
            removeExtensionStatus: removeExtensionStatus,
            extensionInstalled: extensionInstalled,
            extensionCanConnect: extensionCanConnect,
            extensionHasFeature: extensionHasFeature,
        }, children: children }));
};


