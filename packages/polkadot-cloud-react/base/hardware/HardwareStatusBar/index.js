import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ButtonHelp } from "../../../buttons/ButtonHelp";
import { ButtonMonoInvert } from "../../../buttons/ButtonMonoInvert";
import { ButtonPrimaryInvert } from "../../../buttons/ButtonPrimaryInvert";
import { motion } from "framer-motion";
import "@polkadot-cloud/core/css/base/hardware/HardwareStatusBar/index.css";
export var HardwareStatusBar = function (_a) {
    var handleCancel = _a.handleCancel, handleDone = _a.handleDone, show = _a.show, help = _a.help, Icon = _a.Icon, inProgress = _a.inProgress, style = _a.style, _b = _a.t, tDone = _b.tDone, tCancel = _b.tCancel, text = _a.text;
    var _c = help || {}, helpKey = _c.helpKey, handleHelp = _c.handleHelp;
    return (_jsx(motion.div, { style: style, className: "hardware-status-bar", initial: "hidden", animate: show ? "show" : undefined, variants: {
            hidden: { bottom: -50 },
            show: {
                bottom: 0,
                transition: {
                    staggerChildren: 0.01,
                },
            },
        }, transition: {
            duration: 2,
            type: "spring",
            bounce: 0.4,
        }, children: _jsxs("div", { className: "inner", children: [_jsxs("section", { children: [_jsx("div", { style: { width: "3rem", height: "3rem" }, className: "icon", children: _jsx(Icon, {}) }), _jsx("div", { className: "text", children: _jsxs("h3", { children: [text, help && (_jsx(ButtonHelp, { marginLeft: true, onClick: function () {
                                            if (typeof handleHelp === "function") {
                                                handleHelp(helpKey);
                                            }
                                        }, background: "secondary" }))] }) })] }), _jsx("section", { children: inProgress ? (_jsx(ButtonMonoInvert, { text: tCancel, onClick: function () {
                            return typeof handleCancel === "function" && handleCancel();
                        } })) : (_jsx(ButtonPrimaryInvert, { text: tDone, onClick: function () {
                            if (typeof handleDone === "function") {
                                handleDone();
                            }
                        } })) })] }) }));
};


