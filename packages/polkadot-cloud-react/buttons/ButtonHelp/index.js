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
import { InfoSVG } from "../../svg/Info";
import { valEmpty, onMouseHandlers } from "../../utils";
import "@polkadot-cloud/core/css/buttons/ButtonHelp/index.css";
export var ButtonHelp = function (_a) {
    var disabled = _a.disabled, marginLeft = _a.marginLeft, marginRight = _a.marginRight, marginX = _a.marginX, className = _a.className, style = _a.style, onClick = _a.onClick, onMouseOver = _a.onMouseOver, onMouseMove = _a.onMouseMove, onMouseOut = _a.onMouseOut, _b = _a.outline, outline = _b === void 0 ? false : _b, _c = _a.background, background = _c === void 0 ? "primary" : _c;
    return (_jsx("button", __assign({ className: "btn-help".concat(valEmpty(background === "secondary", "background-secondary")).concat(valEmpty(background === "none", "background-none")).concat(valEmpty(outline, "outline")).concat(valEmpty(marginRight, "m-right")).concat(valEmpty(marginLeft, "m-left")).concat(valEmpty(marginX, "m-x")).concat(className ? " ".concat(className) : ""), style: style, type: "button", disabled: disabled }, onMouseHandlers({ onClick: onClick, onMouseOver: onMouseOver, onMouseMove: onMouseMove, onMouseOut: onMouseOut }), { children: _jsx(InfoSVG, {}) })));
};
