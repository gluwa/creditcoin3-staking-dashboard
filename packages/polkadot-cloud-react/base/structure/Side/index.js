var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { jsx as _jsx } from "react/jsx-runtime";
import { valEmpty } from "../../../utils";
import "@polkadot-cloud/core/css/base/structure/Side/index.css";
export var Side = function (_a) {
    var children = _a.children, style = _a.style, open = _a.open, minimised = _a.minimised, _b = _a.width, width = _b === void 0 ? "20rem" : _b;
    var vars = { "--core-side-width": width };
    return (_jsx("div", { style: __assign(__assign({}, vars), style), className: "core-side".concat(valEmpty(!open, "hidden")).concat(valEmpty(minimised, "minimised")), children: children }));
};


