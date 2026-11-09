import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import "@polkadot-cloud/core/css/base/inputs/Switch/index.css";
import { useState, useEffect } from "react";
import { valEmpty } from "../../../utils";
export var Switch = function (_a) {
    var _b = _a.type, type = _b === void 0 ? "primary" : _b, size = _a.size, _c = _a.isOn, isOn = _c === void 0 ? true : _c, disabled = _a.disabled, handleToggle = _a.handleToggle, onColor = _a.onColor, className = _a.className;
    var _d = useState(isOn), switchOn = _d[0], setSwitchOn = _d[1];
    var _e = useState(""), bgColor = _e[0], setBgColor = _e[1];
    var _f = useState(""), buttonColor = _f[0], setButtonColor = _f[1];
    var _g = useState(""), borderColor = _g[0], setBorderColor = _g[1];
    useEffect(function () {
        switch (type) {
            case "secondary": {
                if (disabled) {
                    setBgColor("grey");
                    setBorderColor("#CBCBCB");
                    setButtonColor("#CBCBCB");
                    break;
                }
                setBorderColor("var(--border-secondary-color)");
                if (!switchOn) {
                    setButtonColor("var(--accent-color-secondary)");
                    setBgColor("var(--background-invert)");
                }
                else {
                    setButtonColor("#FFFFFF");
                    setBgColor("var(--accent-color-secondary)");
                }
                break;
            }
            case "monoInvert": {
                setBorderColor("#CCCCCC");
                if (disabled) {
                    setBgColor("grey");
                    setButtonColor("#CCCCCC");
                    break;
                }
                if (!switchOn) {
                    setButtonColor("#000000");
                    setBgColor("var(--text-color-invert)");
                }
                else {
                    setButtonColor("#000000");
                    setBgColor("var(--text-color-tertiary)");
                }
                break;
            }
            case "mono": {
                if (disabled) {
                    setBgColor("#CCCCCC");
                    setBorderColor("#CCCCCC");
                    setButtonColor("grey");
                    break;
                }
                setBorderColor("var(--border-primary-color)");
                if (!switchOn) {
                    setButtonColor("#FFFFFF");
                    setBgColor("var(--text-color-tertiary)");
                }
                else {
                    setButtonColor("#FFFFFF");
                    setBgColor("var(--text-color-primary)");
                }
                break;
            }
            case "primary":
            default: {
                if (disabled) {
                    setBgColor("grey");
                    setBorderColor("#CBCBCB");
                    setButtonColor("#CBCBCB");
                    break;
                }
                setBorderColor("var(--border-primary-color)");
                if (!switchOn) {
                    setButtonColor("var(--accent-color-primary)");
                    setBgColor("var(--background-invert)");
                }
                else {
                    setButtonColor("#FFFFFF");
                    setBgColor("var(--accent-color-primary)");
                }
            }
        }
    }, [disabled, type, switchOn, onColor]);
    return (_jsx(_Fragment, { children: _jsxs("label", { style: { background: bgColor, border: "1px solid ".concat(borderColor) }, className: "base-inputs-switch-label ".concat(valEmpty(size, size), " ").concat(valEmpty(className, className), " ").concat(disabled ? "is-disabled" : "is-enabled"), children: [_jsx("input", { disabled: disabled, onChange: function () {
                        if (!disabled) {
                            setSwitchOn(!switchOn);
                            handleToggle();
                        }
                    }, checked: switchOn, className: "base-inputs-switch-checkbox", type: "checkbox" }), _jsx("span", { style: { backgroundColor: buttonColor }, className: "base-inputs-switch-button ".concat(valEmpty(size, size), " ").concat(disabled ? "is-disabled" : "", " is-clicked").concat(switchOn ? "" : "-not") })] }) }));
};
