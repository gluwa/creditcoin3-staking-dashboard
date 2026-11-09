import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Modal } from "./Modal";
import { Canvas } from "./Canvas";
import { Background } from "./Background";
export var Overlay = function (_a) {
    var _b = _a.modals, modals = _b === void 0 ? {} : _b, _c = _a.canvas, canvas = _c === void 0 ? {} : _c, fallback = _a.fallback, externalOverlayStatus = _a.externalOverlayStatus;
    return (_jsxs(_Fragment, { children: [_jsx(Background, { externalOverlayStatus: externalOverlayStatus }), _jsx(Modal, { fallback: fallback, modals: modals, externalOverlayStatus: externalOverlayStatus }), _jsx(Canvas, { fallback: fallback, canvas: canvas, externalOverlayStatus: externalOverlayStatus })] }));
};
