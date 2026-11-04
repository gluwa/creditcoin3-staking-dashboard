import { jsx as _jsx } from "react/jsx-runtime";
import { valEmpty } from "../../../utils";
import "@polkadot-cloud/core/css/base/structure/PageRow/index.css";
export var PageRow = function (_a) {
    var children = _a.children, style = _a.style, yMargin = _a.yMargin;
    return (_jsx("div", { className: "core-page-row".concat(valEmpty(yMargin, "y-margin")), style: style, children: children }));
};


