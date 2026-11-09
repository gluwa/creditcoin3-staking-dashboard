import { jsx as _jsx } from "react/jsx-runtime";
import { forwardRef } from "react";
import { valEmpty } from "../../../utils";
import "@polkadot-cloud/core/css/base/modal/ModalFixedTitle/index.css";
export var ModalFixedTitle = forwardRef(function (_a, ref) {
    var children = _a.children, style = _a.style, withStyle = _a.withStyle;
    return (_jsx("div", { ref: ref, className: "modal-fixed-title".concat(valEmpty(withStyle, "with-style")), style: style, children: children }));
});
ModalFixedTitle.displayName = "ModalFixedTitle";
