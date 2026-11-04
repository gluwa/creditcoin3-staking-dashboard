import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState, createRef } from "react";
import "@polkadot-cloud/core/css/complex/Odometer/index.css";
export var Odometer = function (_a) {
    var value = _a.value, _b = _a.spaceBefore, spaceBefore = _b === void 0 ? 0 : _b, _c = _a.spaceAfter, spaceAfter = _c === void 0 ? "0.25rem" : _c, _d = _a.wholeColor, wholeColor = _d === void 0 ? "var(--text-color-primary)" : _d, _e = _a.decimalColor, decimalColor = _e === void 0 ? "var(--text-color-tertiary)" : _e, _f = _a.zeroDecimals, zeroDecimals = _f === void 0 ? 0 : _f;
    var allDigits = useState([
        "comma",
        "dot",
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
    ])[0];
    var _g = useState([]), digits = _g[0], setDigits = _g[1];
    var _h = useState([]), prevDigits = _h[0], setPrevDigits = _h[1];
    var _j = useState("inactive"), status = _j[0], setStatus = _j[1];
    var _k = useState(false), initialized = _k[0], setInitialized = _k[1];
    var odometerRef = useState(createRef())[0];
    var _l = useState([]), digitRefs = _l[0], setDigitRefs = _l[1];
    var _m = useState({}), allDigitRefs = _m[0], setAllDigitRefs = _m[1];
    useEffect(function () {
        var all = Object.fromEntries(Object.values(allDigits).map(function (v) { return ["d_".concat(v), createRef()]; }));
        setAllDigitRefs(all);
    }, []);
    useEffect(function () {
        if (Object.keys(allDigitRefs)) {
            value =
                String(value) === "0" ? Number(value).toFixed(zeroDecimals) : value;
            var newDigits = value
                .toString()
                .split("")
                .map(function (v) { return (v === "." ? "dot" : v); })
                .map(function (v) { return (v === "," ? "comma" : v); });
            setDigits(newDigits);
            if (!initialized) {
                setInitialized(true);
            }
            else {
                setStatus("new");
                setPrevDigits(digits);
            }
            setDigitRefs(Array(newDigits.length).fill(createRef()));
        }
    }, [value]);
    useEffect(function () {
        if (status === "new" && !digitRefs.find(function (d) { return d.current === null; })) {
            setStatus("transition");
        }
    }, [status, digitRefs]);
    var odometerCurrent = odometerRef === null || odometerRef === void 0 ? void 0 : odometerRef.current;
    var lineHeight = odometerCurrent
        ? window.getComputedStyle(odometerCurrent).lineHeight
        : "inherit";
    lineHeight = lineHeight === "normal" ? "1.1rem" : lineHeight;
    var foundDecimal = false;
    return (_jsxs("span", { className: "odometer", children: [allDigits.map(function (d, i) { return (_jsx("span", { ref: allDigitRefs["d_".concat(d)], className: "odometer-t-digit ", children: d === "dot" ? "." : d === "comma" ? "," : d }, "template_digit_".concat(i))); }), _jsxs("span", { className: "odometer-inner", ref: odometerRef, children: [spaceBefore ? _jsx("span", { style: { paddingLeft: spaceBefore } }) : null, digits.map(function (d, i) {
                        var _a, _b;
                        if (d === "dot")
                            foundDecimal = true;
                        var childDigits = null;
                        if (status === "transition") {
                            var digitsToAnimate = [];
                            var digitIndex = allDigits.indexOf(digits[i]);
                            var prevDigitIndex_1 = allDigits.indexOf(prevDigits[i]);
                            var difference = Math.abs(digitIndex - prevDigitIndex_1);
                            var delay = "".concat(0.01 * (digits.length - i - 1), "s");
                            var direction = digitIndex === prevDigitIndex_1 ? "none" : "down";
                            var animClass = "slide-".concat(direction, "-").concat(difference, " ");
                            digitsToAnimate.push(prevDigits[i]);
                            if (digitIndex < prevDigitIndex_1) {
                                digitsToAnimate.push.apply(digitsToAnimate, Array.from({ length: difference }, function (_, k) { return allDigits[prevDigitIndex_1 - k - 1]; }));
                            }
                            else {
                                digitsToAnimate.push.apply(digitsToAnimate, Array.from({ length: difference }, function (_, k) { return allDigits[k + prevDigitIndex_1 + 1]; }));
                            }
                            childDigits = (_jsx("span", { style: {
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    animationName: direction === "none" ? undefined : animClass,
                                    animationDuration: direction === "none" ? undefined : "0.75s",
                                    animationFillMode: "forwards",
                                    animationTimingFunction: "cubic-bezier(0.1, 1, 0.2, 1)",
                                    animationDelay: delay,
                                    color: foundDecimal ? decimalColor : wholeColor,
                                }, children: digitsToAnimate.map(function (c, j) { return (_jsx("span", { className: "odometer-digit odometer-child", style: {
                                        top: j === 0 ? 0 : "".concat(100 * j, "%"),
                                        height: lineHeight,
                                        lineHeight: lineHeight,
                                    }, children: c === "dot" ? "." : c === "comma" ? "," : c }, "child_digit_".concat(j))); }) }));
                        }
                        return (_jsxs("span", { ref: digitRefs[i], className: "odometer-digit", style: {
                                color: foundDecimal ? decimalColor : wholeColor,
                                height: lineHeight,
                                lineHeight: lineHeight,
                                paddingRight: status === "transition"
                                    ? "".concat((_b = (_a = allDigitRefs["d_".concat(d)]) === null || _a === void 0 ? void 0 : _a.current) === null || _b === void 0 ? void 0 : _b.offsetWidth, "px")
                                    : "0",
                            }, children: [status === "inactive" && (_jsx("span", { className: "odometer-digit odometer-child", style: {
                                        top: 0,
                                        height: lineHeight,
                                        lineHeight: lineHeight,
                                    }, children: d === "dot" ? "." : d === "comma" ? "," : d })), status === "transition" && childDigits] }, "digit_".concat(i)));
                    }), spaceAfter ? _jsx("span", { style: { paddingRight: spaceAfter } }) : null] })] }));
};


