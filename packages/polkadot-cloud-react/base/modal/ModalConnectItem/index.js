import { jsx as _jsx } from "react/jsx-runtime";
import { valEmpty } from "../../../utils";
import "@polkadot-cloud/core/css/base/modal/ModalConnectItem/index.css";
export var ModalConnectItem = function (_a) {
    var children = _a.children, style = _a.style, canConnect = _a.canConnect;
    return (_jsx("div", { className: "modal-connect-item".concat(valEmpty(canConnect, "can-connect")), style: style, children: children }));
};
