import { jsx as _jsx } from "react/jsx-runtime";
import { forwardRef } from "react";
import "@polkadot-cloud/core/css/base/structure/Main/index.css";
export var Main = forwardRef(function (_a, ref) {
    var children = _a.children, style = _a.style;
    return (_jsx("div", { ref: ref, className: "core-main", style: style, children: children }));
});
Main.displayName = "Main";
