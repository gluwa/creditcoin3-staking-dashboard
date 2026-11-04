import { jsx as _jsx } from "react/jsx-runtime";
import { forwardRef } from "react";
import "@polkadot-cloud/core/css/base/modal/ModalCard/index.css";
export var ModalCard = forwardRef(function (_a, ref) {
    var children = _a.children, style = _a.style, className = _a.className;
    return (_jsx("div", { ref: ref, className: "modal-card".concat(className ? " ".concat(className) : ""), style: style, children: children }));
});
ModalCard.displayName = "ModalCard";


