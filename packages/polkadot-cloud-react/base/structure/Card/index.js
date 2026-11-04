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
import { motion } from "framer-motion";
import "@polkadot-cloud/core/css/base/structure/Card/index.css";
import { valEmpty } from "../../../utils";
export var Card = function (_a) {
    var children = _a.children, style = _a.style, animations = _a.animations, className = _a.className;
    return (_jsx(motion.div, __assign({}, animations, { style: style, className: "core-card" + valEmpty(className, className), children: children })));
};


