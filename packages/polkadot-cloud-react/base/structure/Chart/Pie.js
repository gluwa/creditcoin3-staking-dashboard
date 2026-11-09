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
import { useState, useEffect, useMemo } from "react";
var PROGRESS_TIMEOUT = 5;
var getArcPath = function (start, end, innerRadius, outerRadius) {
    var startAngle = start * Math.PI * 2;
    var endAngle = end * Math.PI * 2;
    var x1 = innerRadius * Math.sin(startAngle);
    var y1 = innerRadius * -Math.cos(startAngle);
    var x2 = outerRadius * Math.sin(startAngle);
    var y2 = outerRadius * -Math.cos(startAngle);
    var x3 = outerRadius * Math.sin(endAngle);
    var y3 = outerRadius * -Math.cos(endAngle);
    var x4 = innerRadius * Math.sin(endAngle);
    var y4 = innerRadius * -Math.cos(endAngle);
    var bigArc = end - start >= 0.5;
    var outerFlags = bigArc ? "1 1 1" : "0 0 1";
    var innerFlags = bigArc ? "1 1 0" : "1 0 0";
    return "M ".concat(x1, ",").concat(y1, " L ").concat(x2, ",").concat(y2, " A ").concat(outerRadius, " ").concat(outerRadius, " ").concat(outerFlags, " ").concat(x3, ",").concat(y3, "\n        L ").concat(x4, ",").concat(y4, " A ").concat(innerRadius, " ").concat(innerRadius, " ").concat(innerFlags, " ").concat(x1, ",").concat(y1, " Z");
};
export var Pie = function (_a) {
    var diameter = _a.diameter, items = _a.items, _b = _a.innerRadius, innerRadius = _b === void 0 ? 0 : _b, _c = _a.speed, speed = _c === void 0 ? 1 : _c;
    var _d = useState(0), visiblePart = _d[0], setVisiblePart = _d[1];
    var rad = useState(diameter / 2)[0];
    useEffect(function () {
        if (visiblePart < 1) {
            setTimeout(function () { return setVisiblePart(visiblePart + speed / 100); }, PROGRESS_TIMEOUT);
        }
    }, [visiblePart]);
    var segments = useMemo(function () {
        var sum = items.reduce(function (sum, item) { return sum + item.value; }, 0);
        if (sum === 0) {
            return [
                {
                    color: "var(--background-default)",
                    path: "M 0 0 L 0 -".concat(rad, " A ").concat(rad, " ").concat(rad, " 1 1 1 -0.1 -").concat(rad, " L 0 0 A 0 0 1 1 0 0 0 Z"),
                },
            ];
        }
        var start = 0;
        var filtered_items = items.filter(function (item) { return item.value !== 0; });
        return filtered_items.map(function (item) {
            var p = sum * (1 / 1000);
            if (item.value === sum) {
                item.value = sum - p;
            }
            var delta = (item.value / sum) * visiblePart;
            var path = getArcPath(start, start + delta, innerRadius, rad);
            start += delta;
            return __assign(__assign({}, item), { path: path });
        });
    }, [items, innerRadius, rad, visiblePart]);
    return (_jsx("svg", { width: diameter, height: diameter, style: { overflow: "initial" }, children: _jsx("g", { transform: "translate(".concat(rad, ",").concat(rad, ")"), children: segments.map(function (segment) {
                return (_jsx("path", { stroke: segment.color, fill: segment.color, d: segment.path }, segment.color));
            }) }) }));
};
