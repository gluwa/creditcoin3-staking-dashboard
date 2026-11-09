import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { capitalizeFirstLetter } from "@polkadot-cloud/utils";
import { valOr } from "../../utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@polkadot-cloud/core/css/textfield/index.css";
export var Textfield = function (_a) {
    var onChange = _a.onChange, className = _a.className, placeholder = _a.placeholder, autoFocus = _a.autoFocus, name = _a.name, disabled = _a.disabled, _b = _a.inputType, inputType = _b === void 0 ? "text" : _b, value = _a.value, iconLeft = _a.iconLeft, iconRight = _a.iconRight;
    return (_jsxs("div", { className: "outer", style: {
            borderRadius: "10rem",
            width: "100%",
            border: "0.2rem solid var(--border-primary-color)",
            color: "var(--text-color-secondary)",
        }, children: [iconLeft ? (_jsx(FontAwesomeIcon, { icon: iconLeft.icon, className: "icon-left ".concat((iconLeft === null || iconLeft === void 0 ? void 0 : iconLeft.action) ? "icon-action" : null), transform: valOr(iconLeft.iconTransform, iconLeft.iconTransform, undefined), onClick: iconLeft.action })) : null, _jsx("input", { style: { color: "var(--text-color-secondary)", padding: "0.5rem 1rem" }, disabled: disabled, className: "input ".concat(className ? " ".concat(className) : ""), onChange: function (_a) {
                    var target = _a.target;
                    return onChange(target === null || target === void 0 ? void 0 : target.value);
                }, type: inputType, placeholder: placeholder && capitalizeFirstLetter(placeholder), autoFocus: autoFocus, name: name, value: value }), iconRight ? (_jsx(FontAwesomeIcon, { icon: iconRight.icon, className: "icon-right ".concat((iconRight === null || iconRight === void 0 ? void 0 : iconRight.action) ? "icon-action" : null), transform: valOr(iconRight.iconTransform, iconRight.iconTransform, undefined), onClick: iconRight.action })) : null] }));
};
