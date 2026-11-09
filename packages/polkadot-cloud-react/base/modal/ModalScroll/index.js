import { jsx as _jsx } from "react/jsx-runtime";
import { forwardRef } from "react";
import { valEmpty } from "../../../utils";
import "@polkadot-cloud/core/css/base/modal/ModalScroll/index.css";
export var ModalScroll = forwardRef(function (_a, ref) {
    var size = _a.size, children = _a.children, style = _a.style;
    return (_jsx("div", { ref: ref, className: "modal-scroll".concat(valEmpty(size === "xl", "xl")).concat(valEmpty(size === "lg", "lg")), style: style, children: children }));
});
ModalScroll.displayName = "ModalScroll";
