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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { onMouseHandlers, valEmpty } from "../../utils";
import "@polkadot-cloud/core/css/buttons/ButtonTab/index.css";
export var ButtonTab = function (_a) {
    var disabled = _a.disabled, className = _a.className, style = _a.style, active = _a.active, title = _a.title, badge = _a.badge, onClick = _a.onClick, onMouseOver = _a.onMouseOver, onMouseMove = _a.onMouseMove, onMouseOut = _a.onMouseOut;
    return (_jsxs("button", __assign({ className: "btn-tab".concat(valEmpty(active, "active")).concat(className ? " ".concat(className) : ""), style: style, type: "button", disabled: disabled }, onMouseHandlers({ onClick: onClick, onMouseOver: onMouseOver, onMouseMove: onMouseMove, onMouseOut: onMouseOut }), { children: [title, badge ? _jsx("span", { className: "badge", children: badge }) : null] })));
};


