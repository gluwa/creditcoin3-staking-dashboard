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
import { jsx as _jsx } from "react/jsx-runtime";
import { useRef, useState, createContext } from "react";
import { setStateWithRef } from "@polkadot-cloud/utils";
import { useEffectIgnoreInitial } from "../../base/hooks/useEffectIgnoreInitial";
import { defaultCanvasConfig, defaultModalConfig, defaultOverlayContext, } from "./defaults";
export var OverlayContext = createContext(defaultOverlayContext);
export var OverlayProvider = function (_a) {
    var children = _a.children;
    var _b = useState(0), openOverlayInstances = _b[0], setOpenOverlayInstancesState = _b[1];
    var setOpenOverlayInstances = function (direction, instanceType) {
        if (direction === "inc") {
            setOpenOverlayInstancesState(openOverlayInstances + 1);
            setActiveOverlayInstance(instanceType);
        }
        else {
            setOpenOverlayInstancesState(Math.max(openOverlayInstances - 1, 0));
        }
    };
    var _c = useState(null), activeOverlayInstance = _c[0], setActiveOverlayInstance = _c[1];
    var _d = useState("closed"), modalStatus = _d[0], setModalStatusState = _d[1];
    var modalStatusRef = useRef(modalStatus);
    var _e = useState(defaultModalConfig), modalConfig = _e[0], setModalConfigState = _e[1];
    var modalConfigRef = useRef(modalConfig);
    var _f = useState(0), modalHeight = _f[0], setModalHeightState = _f[1];
    var _g = useState(0), modalResizeCounter = _g[0], setModalResizeCounterState = _g[1];
    var _h = useState(), modalRef = _h[0], setModalRef = _h[1];
    var _j = useState(), modalHeightRef = _j[0], setModalHeightRef = _j[1];
    var modalMaxHeight = window.innerHeight * 0.8;
    var setModalConfig = function (config) {
        setStateWithRef(config, setModalConfigState, modalConfigRef);
    };
    var setModalStatus = function (newStatus) {
        setStateWithRef(newStatus, setModalStatusState, modalStatusRef);
    };
    var openModal = function (_a) {
        var key = _a.key, _b = _a.size, size = _b === void 0 ? "lg" : _b, _c = _a.options, options = _c === void 0 ? {} : _c;
        if (canvasStatus !== "closed")
            return;
        setModalConfig({ key: key, size: size, options: options });
        setModalStatus("opening");
        if (!(options === null || options === void 0 ? void 0 : options.replacing)) {
            setOpenOverlayInstances("inc", "modal");
        }
    };
    var replaceModal = function (_a) {
        var key = _a.key, _b = _a.size, size = _b === void 0 ? "lg" : _b, _c = _a.options, options = _c === void 0 ? {} : _c;
        setModalStatus("replacing");
        setTimeout(function () {
            openModal({
                key: key,
                size: size,
                options: __assign(__assign({}, options), { replacing: true }),
            });
        }, 10);
    };
    var setModalHeight = function (height, transition) {
        if (transition === void 0) { transition = true; }
        if (modalStatusRef.current === "closed")
            return;
        if (transition)
            transitionOn();
        else
            transitionOff();
        var maxHeight = window.innerWidth <= 600
            ? window.innerHeight * 0.9
            : window.innerHeight * 0.8;
        if (height > maxHeight)
            height = maxHeight;
        setModalHeightState(height);
        if (transition)
            setTimeout(function () { return transitionOff(); }, 500);
    };
    var setModalResize = function () {
        transitionOn();
        setModalResizeCounterState(modalResizeCounter + 1);
        setTimeout(function () { return transitionOff(); }, 500);
    };
    var transitionOn = function () { var _a; return (_a = modalHeightRef === null || modalHeightRef === void 0 ? void 0 : modalHeightRef.current) === null || _a === void 0 ? void 0 : _a.classList.add("transition-height"); };
    var transitionOff = function () { var _a; return (_a = modalHeightRef === null || modalHeightRef === void 0 ? void 0 : modalHeightRef.current) === null || _a === void 0 ? void 0 : _a.classList.remove("transition-height"); };
    var _k = useState("closed"), canvasStatus = _k[0], setCanvasStatus = _k[1];
    var _l = useState({
        key: "",
        scroll: true,
        options: {},
    }), canvasConfig = _l[0], setCanvasConfig = _l[1];
    var openCanvas = function (_a) {
        var key = _a.key, _b = _a.size, size = _b === void 0 ? "lg" : _b, _c = _a.scroll, scroll = _c === void 0 ? true : _c, options = _a.options;
        setCanvasStatus("open");
        setOpenOverlayInstances("inc", "canvas");
        setCanvasConfig({
            key: key,
            size: size,
            scroll: scroll,
            options: options || {},
        });
    };
    var closeCanvas = function () {
        setCanvasStatus("closing");
    };
    useEffectIgnoreInitial(function () {
        var _a;
        var height = ((_a = modalRef === null || modalRef === void 0 ? void 0 : modalRef.current) === null || _a === void 0 ? void 0 : _a.clientHeight) || 0;
        if (modalStatusRef.current === "opening") {
            setModalHeight(height, false);
            if (height > 0) {
                setModalStatus("open");
            }
        }
    }, [modalStatusRef.current, modalRef === null || modalRef === void 0 ? void 0 : modalRef.current]);
    useEffectIgnoreInitial(function () {
        if (canvasStatus === "closed") {
            setCanvasConfig(defaultCanvasConfig);
        }
    }, [canvasStatus]);
    return (_jsx(OverlayContext.Provider, { value: {
            openOverlayInstances: openOverlayInstances,
            setOpenOverlayInstances: setOpenOverlayInstances,
            activeOverlayInstance: activeOverlayInstance,
            setActiveOverlayInstance: setActiveOverlayInstance,
            canvas: {
                status: canvasStatus,
                config: canvasConfig,
                openCanvas: openCanvas,
                closeCanvas: closeCanvas,
                setCanvasStatus: setCanvasStatus,
            },
            modal: {
                status: modalStatusRef.current,
                config: modalConfigRef.current,
                modalHeight: modalHeight,
                modalMaxHeight: modalMaxHeight,
                modalResizeCounter: modalResizeCounter,
                openModal: openModal,
                replaceModal: replaceModal,
                setModalHeight: setModalHeight,
                setModalResize: setModalResize,
                setModalStatus: setModalStatus,
                setModalRef: setModalRef,
                setModalHeightRef: setModalHeightRef,
            },
        }, children: children }));
};


