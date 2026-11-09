var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { useEffect, useRef } from "react";
export var useEffectIgnoreInitial = function (fn, deps) {
    var isInitial = useRef(true);
    useEffect(function () {
        if (!isInitial.current)
            fn();
        isInitial.current = false;
    }, deps ? __spreadArray([], deps, true) : undefined);
};
