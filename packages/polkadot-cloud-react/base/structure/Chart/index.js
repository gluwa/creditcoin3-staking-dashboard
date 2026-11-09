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
import { Pie } from "./Pie";
export var Chart = function (props) {
    var type = props.type;
    switch (type) {
        case "pie":
        default: {
            var p = props;
            return _jsx(Pie, __assign({}, p));
        }
    }
};
