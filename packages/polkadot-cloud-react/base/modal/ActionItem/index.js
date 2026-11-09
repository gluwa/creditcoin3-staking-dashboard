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
import { faCheck, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import "@polkadot-cloud/core/css/base/modal/ActionItem/index.css";
export var ActionItem = function (_a) {
    var style = _a.style, text = _a.text, toggled = _a.toggled, disabled = _a.disabled, onToggle = _a.onToggle, _b = _a.inactive, inactive = _b === void 0 ? false : _b, inlineButton = _a.inlineButton;
    var _c = useState(toggled), toggle = _c[0], setToggle = _c[1];
    useEffect(function () { return setToggle(toggled); }, [toggled]);
    return (_jsxs("h3", { className: "modal-action-item", style: __assign(__assign({}, style), { opacity: inactive ? "var(--opacity-disabled)" : 1 }), children: [toggled === undefined ? (_jsx(FontAwesomeIcon, { icon: faChevronRight, transform: "shrink-6" })) : (_jsx("button", { type: "button", className: "toggle", disabled: disabled, onClick: function () {
                    if (typeof onToggle === "function") {
                        onToggle(!toggle);
                    }
                    setToggle(!toggle);
                }, children: toggle && _jsx(FontAwesomeIcon, { icon: faCheck, transform: "shrink-3" }) })), text, inlineButton && _jsx("span", { children: inlineButton })] }));
};
