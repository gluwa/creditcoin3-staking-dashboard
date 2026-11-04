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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { onMouseHandlers, valEmpty, valOr } from "../../utils";
import "@polkadot-cloud/core/css/buttons/ButtonPrimaryInvert/index.css";
export var ButtonPrimaryInvert = function (_a) {
    var colorSecondary = _a.colorSecondary, disabled = _a.disabled, grow = _a.grow, iconLeft = _a.iconLeft, iconRight = _a.iconRight, iconTransform = _a.iconTransform, lg = _a.lg, marginLeft = _a.marginLeft, marginRight = _a.marginRight, marginX = _a.marginX, className = _a.className, style = _a.style, text = _a.text, onClick = _a.onClick, onMouseOver = _a.onMouseOver, onMouseMove = _a.onMouseMove, onMouseOut = _a.onMouseOut;
    return (_jsxs("button", __assign({ className: "btn-primary-invert".concat(valEmpty(colorSecondary, "secondary-color")).concat(valEmpty(grow, "grow")).concat(valOr(lg, "lg", "sm")).concat(valEmpty(marginRight, "m-right")).concat(valEmpty(marginLeft, "m-left")).concat(valEmpty(marginX, "m-x")).concat(className ? " ".concat(className) : ""), style: style, type: "button", disabled: disabled }, onMouseHandlers({ onClick: onClick, onMouseOver: onMouseOver, onMouseMove: onMouseMove, onMouseOut: onMouseOut }), { children: [iconLeft ? (_jsx(FontAwesomeIcon, { icon: iconLeft, className: valOr(text, "icon-left", undefined), transform: valOr(iconTransform, iconTransform, undefined) })) : null, text ? text : null, iconRight ? (_jsx(FontAwesomeIcon, { icon: iconRight, className: valOr(text, "icon-right", undefined), transform: valOr(iconTransform, iconTransform, undefined) })) : null] })));
};


