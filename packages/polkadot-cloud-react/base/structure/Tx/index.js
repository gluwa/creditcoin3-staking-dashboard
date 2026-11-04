import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { faPenToSquare, faWarning } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { valEmpty } from "../../../utils";
import "@polkadot-cloud/core/css/base/structure/Tx/index.css";
export var Tx = function (_a) {
    var margin = _a.margin, label = _a.label, name = _a.name, notEnoughFunds = _a.notEnoughFunds, dangerMessage = _a.dangerMessage, SignerComponent = _a.SignerComponent, _b = _a.displayFor, displayFor = _b === void 0 ? "default" : _b;
    return (_jsx("div", { className: "core-tx".concat(valEmpty(margin, "margin")), children: _jsxs("div", { className: "inner".concat(valEmpty(displayFor === "canvas", "canvas")), children: [_jsxs("p", { className: "sign", children: [_jsxs("span", { className: "badge", children: [_jsx(FontAwesomeIcon, { icon: faPenToSquare, className: "icon" }), label] }), name, notEnoughFunds && (_jsxs("span", { className: "not-enough", children: ["/ \u00A0", _jsx(FontAwesomeIcon, { icon: faWarning, className: "danger", transform: "shrink-1" }), " ", _jsx("span", { className: "danger", children: dangerMessage })] }))] }), _jsx("section", { children: SignerComponent })] }) }));
};


