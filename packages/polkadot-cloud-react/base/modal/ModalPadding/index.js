import { jsx as _jsx } from "react/jsx-runtime";
import { forwardRef } from "react";
import { valEmpty } from "../../../utils";
import "@polkadot-cloud/core/css/base/modal/ModalPadding/index.css";
export var ModalPadding = forwardRef(function (_a, ref) {
    var children = _a.children, style = _a.style, verticalOnly = _a.verticalOnly, horizontalOnly = _a.horizontalOnly;
    return (_jsx("div", { ref: ref, className: "modal-padding".concat(valEmpty(verticalOnly, "vertical-only")).concat(valEmpty(horizontalOnly, "horizontal-only")), style: style, children: children }));
});
ModalPadding.displayName = "ModalPadding";


