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
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { onMouseHandlers, valEmpty } from "../../utils";
import "@polkadot-cloud/core/css/buttons/ButtonOption/index.css";
export var ButtonOption = function (_a) {
    var children = _a.children, className = _a.className, style = _a.style, disabled = _a.disabled, content = _a.content, onClick = _a.onClick, onMouseOver = _a.onMouseOver, onMouseMove = _a.onMouseMove, onMouseOut = _a.onMouseOut;
    return (_jsxs("button", __assign({ className: "btn-option".concat(valEmpty(content, "content")).concat(className ? " ".concat(className) : ""), style: style, type: "button", disabled: disabled }, onMouseHandlers({ onClick: onClick, onMouseOver: onMouseOver, onMouseMove: onMouseMove, onMouseOut: onMouseOut }), { children: [children, _jsx("div", { children: _jsx(FontAwesomeIcon, { transform: "shrink-2", icon: faChevronRight }) })] })));
};


