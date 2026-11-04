import { jsx as _jsx } from "react/jsx-runtime";
import { valEmpty } from "../../../utils";
import "@polkadot-cloud/core/css/base/modal/ModalSection/index.css";
export var ModalSection = function (_a) {
    var children = _a.children, style = _a.style, type = _a.type;
    return (_jsx("div", { className: "".concat(valEmpty(type === "carousel", "modal-carousel")).concat(valEmpty(type === "tab", "modal-tabs")), style: style, children: children }));
};


