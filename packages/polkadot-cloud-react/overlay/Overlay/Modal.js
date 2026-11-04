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
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { ModalContainer } from "../../base/modal/ModalContainer";
import { ModalCard } from "../../base/modal/ModalCard";
import { ModalScroll } from "../../base/modal/ModalScroll";
import { useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";
import { useOverlay } from "../OverlayProvider/useOverlay";
import { ErrorBoundary } from "react-error-boundary";
export var Modal = function (_a) {
    var modals = _a.modals, externalOverlayStatus = _a.externalOverlayStatus, Fallback = _a.fallback;
    var _b = useOverlay(), activeOverlayInstance = _b.activeOverlayInstance, setOpenOverlayInstances = _b.setOpenOverlayInstances, setActiveOverlayInstance = _b.setActiveOverlayInstance, _c = _b.modal, _d = _c.config, key = _d.key, size = _d.size, options = _d.options, status = _c.status, modalHeight = _c.modalHeight, modalResizeCounter = _c.modalResizeCounter, setModalRef = _c.setModalRef, modalMaxHeight = _c.modalMaxHeight, setModalHeight = _c.setModalHeight, setModalStatus = _c.setModalStatus, setModalHeightRef = _c.setModalHeightRef;
    var controls = useAnimation();
    var canvasStatus = useOverlay().canvas.status;
    var modalRef = useRef(null);
    var heightRef = useRef(null);
    var onOutClose = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setOpenOverlayInstances("dec", "modal");
                    setActiveOverlayInstance(null);
                    return [4 , controls.start("out")];
                case 1:
                    _a.sent();
                    setModalStatus("closed");
                    return [2 ];
            }
        });
    }); };
    var onIn = function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 , controls.start("in")];
            case 1: return [2 , _a.sent()];
        }
    }); }); };
    var onOut = function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 , controls.start("out")];
            case 1: return [2 , _a.sent()];
        }
    }); }); };
    var windowResize = function () {
        if (!(options === null || options === void 0 ? void 0 : options.disableWindowResize))
            window.addEventListener("resize", handleResize);
    };
    var handleResize = function () {
        var _a;
        if (status !== "open" || (options === null || options === void 0 ? void 0 : options.disableWindowResize))
            return;
        setModalHeight(((_a = modalRef.current) === null || _a === void 0 ? void 0 : _a.clientHeight) || 0);
    };
    useEffect(function () {
        if (activeOverlayInstance === "modal" && status === "open")
            onIn();
        if (status === "closing")
            onOutClose();
    }, [status]);
    useEffect(function () {
        if (canvasStatus === "open" && status === "open")
            onOut();
        if (canvasStatus === "closing") {
            if (status === "open")
                onIn();
        }
    }, [canvasStatus]);
    useEffect(function () {
        if (externalOverlayStatus === "open" && status === "open")
            onOut();
        if (externalOverlayStatus === "closing" &&
            activeOverlayInstance === "modal")
            onIn();
    }, [externalOverlayStatus]);
    useEffect(function () { return handleResize(); }, [modalResizeCounter, status]);
    useEffect(function () {
        windowResize();
        return function () {
            window.removeEventListener("resize", handleResize);
        };
    });
    useEffect(function () {
        setModalRef(modalRef);
        setModalHeightRef(heightRef);
    }, [modalRef === null || modalRef === void 0 ? void 0 : modalRef.current, heightRef === null || heightRef === void 0 ? void 0 : heightRef.current]);
    var ActiveModal = (modals === null || modals === void 0 ? void 0 : modals[key]) || null;
    return (_jsx(_Fragment, { children: status === "closed" ? null : status !== "replacing" ? (_jsx(ModalContainer, { initial: {
                opacity: 0,
                scale: 0.9,
            }, animate: controls, transition: {
                duration: 0.2,
            }, variants: {
                in: {
                    opacity: 1,
                    scale: 1,
                },
                out: {
                    opacity: 0,
                    scale: 0.9,
                },
            }, style: { opacity: status === "opening" ? 0 : 1 }, children: _jsxs("div", { children: [_jsx(ModalScroll, { ref: heightRef, size: size, style: {
                            height: modalHeight,
                            overflow: (options === null || options === void 0 ? void 0 : options.disableScroll)
                                ? "hidden"
                                : modalHeight >= modalMaxHeight
                                    ? "scroll"
                                    : "hidden",
                        }, children: _jsx(ModalCard, { ref: modalRef, className: externalOverlayStatus === "open" || canvasStatus === "open"
                                ? "dimmed"
                                : undefined, children: _jsx(ErrorBoundary, { FallbackComponent: Fallback || null, children: ActiveModal && _jsx(ActiveModal, {}) }) }) }), _jsx("button", { type: "button", className: "close", onClick: function () {
                            setModalStatus("closing");
                        }, children: "\u00A0" })] }) })) : null }));
};


