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
import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { CanvasScroll } from "../../base/modal/CanvasScroll";
import { ModalContent } from "../../base/modal/ModalContent";
import { CanvasContainer } from "../../base/modal/CanvasContainer";
import { CanvasContent } from "../../base/modal/CanvasContent";
import { useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useOverlay } from "../OverlayProvider/useOverlay";
import { ErrorBoundary } from "react-error-boundary";
export var Canvas = function (_a) {
    var canvas = _a.canvas, externalOverlayStatus = _a.externalOverlayStatus, Fallback = _a.fallback;
    var controls = useAnimation();
    var _b = useOverlay(), setOpenOverlayInstances = _b.setOpenOverlayInstances, activeOverlayInstance = _b.activeOverlayInstance, setActiveOverlayInstance = _b.setActiveOverlayInstance, modalStatus = _b.modal.status, _c = _b.canvas, status = _c.status, setCanvasStatus = _c.setCanvasStatus, _d = _c.config, key = _d.key, size = _d.size, scroll = _d.scroll;
    var onIn = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 , controls.start("visible")];
                case 1:
                    _a.sent();
                    return [2 ];
            }
        });
    }); };
    var onOut = function (closing) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (closing) {
                        setOpenOverlayInstances("dec", "canvas");
                        setActiveOverlayInstance(modalStatus === "open" ? "modal" : null);
                    }
                    return [4 , controls.start("hidden")];
                case 1:
                    _a.sent();
                    if (closing)
                        setCanvasStatus("closed");
                    return [2 ];
            }
        });
    }); };
    useEffect(function () {
        if (externalOverlayStatus === "open" && status === "open")
            onOut(false);
        if (externalOverlayStatus === "closing")
            if (activeOverlayInstance === "canvas") {
                setCanvasStatus("open");
                onIn();
            }
    }, [externalOverlayStatus]);
    useEffect(function () {
        if (status === "open")
            onIn();
        if (status === "closing")
            onOut(true);
    }, [status]);
    var ActiveCanvas = (canvas === null || canvas === void 0 ? void 0 : canvas[key]) || null;
    return (_jsx(_Fragment, { children: status === "closed" ? null : (_jsx(CanvasContainer, { initial: {
                opacity: 0,
            }, animate: controls, transition: {
                duration: 0.15,
            }, variants: {
                hidden: {
                    opacity: 0,
                },
                visible: {
                    opacity: 1,
                },
            }, children: _jsx(CanvasScroll, { size: size, scroll: scroll || false, children: _jsx(ModalContent, { canvas: true, children: _jsx(CanvasContent, { children: _jsx(ErrorBoundary, { FallbackComponent: Fallback, children: ActiveCanvas && _jsx(ActiveCanvas, {}) }) }) }) }) })) }));
};


