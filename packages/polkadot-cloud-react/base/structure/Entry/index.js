import { jsx as _jsx } from "react/jsx-runtime";
import "@polkadot-cloud/core/css/base/structure/Entry/index.css";
export var Entry = function (_a) {
    var children = _a.children, style = _a.style, mode = _a.mode, theme = _a.theme;
    return (_jsx("div", { className: "core-entry theme-".concat(mode, " theme-").concat(theme), style: style, children: children }));
};


