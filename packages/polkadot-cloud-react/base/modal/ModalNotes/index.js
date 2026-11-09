import { jsx as _jsx } from "react/jsx-runtime";
import { valEmpty } from "../../../utils";
import "@polkadot-cloud/core/css/base/modal/ModalNotes/index.css";
export var ModalNotes = function (_a) {
    var children = _a.children, style = _a.style, withPadding = _a.withPadding;
    return (_jsx("div", { className: "modal-notes".concat(valEmpty(withPadding, "with-padding")), style: style, children: children }));
};
