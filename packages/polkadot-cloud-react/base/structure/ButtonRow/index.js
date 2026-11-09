import { jsx as _jsx } from "react/jsx-runtime";
import { valEmpty } from "../../../utils";
import "@polkadot-cloud/core/css/base/structure/ButtonRow/index.css";
export var ButtonRow = function (_a) {
    var children = _a.children, style = _a.style, yMargin = _a.yMargin;
    return (_jsx("div", { className: "core-button-row".concat(valEmpty(yMargin, "y-margin")), style: style, children: children }));
};
