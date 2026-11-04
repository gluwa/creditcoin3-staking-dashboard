import { jsx as _jsx } from "react/jsx-runtime";
import { valEmpty, valOr } from "../../../utils";
import "@polkadot-cloud/core/css/base/structure/RowSection/index.css";
export var RowSection = function (_a) {
    var children = _a.children, style = _a.style, vLast = _a.vLast, hLast = _a.hLast, secondary = _a.secondary;
    return (_jsx("div", { className: "".concat(valOr(secondary, "core-row-secondary", "core-row-primary")).concat(valEmpty(vLast, "v-last")).concat(valOr(hLast, "first", "last")), style: style, children: children }));
};


