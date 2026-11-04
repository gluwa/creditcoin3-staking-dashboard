import { jsx as _jsx } from "react/jsx-runtime";
import { valEmpty } from "../../../utils";
import "@polkadot-cloud/core/css/base/modal/ModalWarnings/index.css";
export var ModalWarnings = function (_a) {
    var children = _a.children, style = _a.style, withMargin = _a.withMargin;
    return (_jsx("div", { className: "modal-warnings".concat(valEmpty(withMargin, "with-margin")), style: style, children: children }));
};


