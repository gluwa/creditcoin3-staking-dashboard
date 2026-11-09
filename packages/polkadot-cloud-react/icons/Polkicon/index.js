var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getCircleXY, outerCircle, renderCircle, Z, getColors, } from "./utils";
import { isValidAddress } from "@polkadot-cloud/utils";
var copyPopup = {
    initial: {
        opacity: 0,
        scale: 0.5,
    },
    animate: {
        opacity: 1,
        scale: 1,
        transition: {
            ease: "easeInOut",
            duration: 0.1,
        },
    },
    exit: {
        opacity: 0,
    },
};
export var Polkicon = function (_a) {
    var _b = _a.size, size = _b === void 0 ? "2rem" : _b, address = _a.address, _c = _a.copy, copy = _c === void 0 ? false : _c, initialColors = _a.colors, outerColor = _a.outerColor, _d = _a.copyTimeout, copyTimeout = _d === void 0 ? 500 : _d;
    var _e = useState([]), colors = _e[0], setColors = _e[1];
    var _f = useState(), xy = _f[0], setXy = _f[1];
    var _g = useState(false), copySuccess = _g[0], setCopySuccess = _g[1];
    var _h = useState("Copied!"), message = _h[0], setMessage = _h[1];
    var _j = useState(), s = _j[0], setS = _j[1];
    var _k = useState(), f = _k[0], setF = _k[1];
    var _l = useState(), p = _l[0], setP = _l[1];
    useEffect(function () {
        var InfoText = function (type, value) {
            return console.warn("Polkicon: 'Size' expressed in '".concat(type, "' cannot be less than ").concat(value, ". Will be resized to minimum size."));
        };
        if (typeof size === "string" &&
            !size.includes("px") &&
            !size.includes("rem")) {
            throw new Error("Providing a string for 'size' in Polkicon should be expressed either in 'px', 'rem' or 'em'");
        }
        var sizeNumb;
        var fontType;
        if (typeof size === "string") {
            fontType = size.replace(/[0-9.]/g, "");
            switch (fontType) {
                case "px":
                    sizeNumb = parseFloat(size);
                    break;
                case "rem":
                    sizeNumb = parseFloat(size) * 10;
                    break;
            }
        }
        else if (typeof size === "number") {
            sizeNumb = size;
        }
        setS(fontType
            ? "".concat(fontType === "px" ? sizeNumb + "px" : sizeNumb / 10 + "rem")
            : sizeNumb);
        if (sizeNumb < 12) {
            InfoText(fontType || "number", fontType === "px" ? "12px" : fontType === "rem" ? "1.2rem" : 12);
        }
        if (sizeNumb < 32) {
            setP("0rem 0.5rem");
            setF("0.5rem");
        }
        else if (sizeNumb >= 32 && sizeNumb < 64) {
            setP("1rem 0.5rem");
            setF("1rem");
        }
        else if (sizeNumb >= 64 && sizeNumb < 100) {
            setP("2rem 1rem");
            setF("1.5rem");
        }
        else if (sizeNumb >= 100) {
            setP("3rem 1rem");
            setF("2rem");
        }
    }, [size]);
    useEffect(function () {
        var ch = "generic";
        if (address) {
            if (address.startsWith("1")) {
                ch = "polkadot";
            }
            else if (address.startsWith("E") ||
                address.startsWith("D") ||
                address.startsWith("G")) {
                ch = "kusama";
            }
            else if (address.startsWith("5")) {
                ch = "westend";
            }
        }
        else {
            ch = "polkadot";
        }
        var circleXy = getCircleXY(ch);
        if (initialColors && (initialColors === null || initialColors === void 0 ? void 0 : initialColors.length) < circleXy.length) {
            var initColIdx = 0;
            for (var i = 0; i < circleXy.length; i++) {
                if (!initialColors[i]) {
                    initialColors[i] = initialColors[initColIdx++];
                }
                if (initColIdx == initialColors.length)
                    initColIdx = 0;
            }
        }
        var defaultColors = new Array(circleXy.length).fill("#ddd");
        var deactiveColors = new Array(circleXy.length).fill("var(--background-invert)");
        setXy(circleXy);
        setColors(isValidAddress(address)
            ? initialColors || getColors(address) || defaultColors
            : deactiveColors);
    }, [address]);
    var handleClick = useCallback(function () {
        var copyText = function (text) { return __awaiter(void 0, void 0, void 0, function () {
            var err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 , navigator.clipboard.writeText(text)];
                    case 1:
                        _a.sent();
                        setCopySuccess(true);
                        setMessage("Copied!");
                        return [3 , 3];
                    case 2:
                        err_1 = _a.sent();
                        setCopySuccess(true);
                        setMessage("Failed!");
                        return [3 , 3];
                    case 3: return [2 ];
                }
            });
        }); };
        copy && copyText(address);
    }, [copy, address]);
    useEffect(function () {
        if (copy && copySuccess) {
            setTimeout(function () {
                setCopySuccess(false);
            }, copyTimeout);
        }
    }, [copy, copySuccess]);
    return (xy && (_jsxs("div", { onClick: copy ? handleClick : undefined, style: copy
            ? {
                cursor: copySuccess ? "none" : "copy",
                position: "relative",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }
            : {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }, children: [_jsx("svg", { viewBox: "0 0 64 64", id: address, name: address, width: s, height: s, children: [
                    outerColor
                        ? outerCircle(outerColor)
                        : outerCircle("var(--background-default"),
                ]
                    .concat(xy.map(function (_a, index) {
                    var cx = _a[0], cy = _a[1];
                    return ({
                        cx: cx,
                        cy: cy,
                        fill: colors[index],
                        r: Z,
                    });
                }))
                    .map(renderCircle) }), copy && (_jsx(AnimatePresence, { children: copySuccess && (_jsx(motion.div, { variants: copyPopup, initial: "initial", animate: "animate", exit: "exit", style: {
                        position: "absolute",
                        padding: p,
                        borderRadius: "100%",
                        backgroundColor: "var(--background-default)",
                        fontWeight: "bold",
                    }, children: _jsx("p", { style: { fontSize: f, fontWeight: "bold" }, children: message }) })) }))] })));
};
