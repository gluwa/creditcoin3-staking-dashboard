import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Button } from "../../../buttons/Button";
import { faCheck, faPlus, faTimes, faXmark, } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { ellipsisFn, unescape } from "@polkadot-cloud/utils";
import "@polkadot-cloud/core/css/base/hardware/HardwareAddress/index.css";
export var HardwareAddress = function (_a) {
    var address = _a.address, index = _a.index, initial = _a.initial, _b = _a.disableEditIfImported, disableEditIfImported = _b === void 0 ? false : _b, Identicon = _a.Identicon, existsHandler = _a.existsHandler, renameHandler = _a.renameHandler, openConfirmHandler = _a.openConfirmHandler, openRemoveHandler = _a.openRemoveHandler, _c = _a.t, tImport = _c.tImport, tRemove = _c.tRemove;
    var _d = useState(false), editing = _d[0], setEditing = _d[1];
    var _e = useState(initial), name = _e[0], setName = _e[1];
    var _f = useState(initial), editName = _f[0], setEditName = _f[1];
    var cancelEditing = function () {
        setEditName(name);
        setEditing(false);
    };
    var commitEdit = function () {
        var newName = editName;
        if (editName === "") {
            newName = ellipsisFn(address, 6);
        }
        if (newName !== name) {
            setName(newName);
            setEditName(newName);
            renameHandler(address, newName);
        }
        setEditing(false);
    };
    var handleChange = function (e) {
        var val = e.currentTarget.value || "";
        val = unescape(val);
        setEditName(val);
    };
    var isImported = existsHandler(address);
    return (_jsxs("div", { className: "hardware-address", children: [_jsx("div", { className: "content", children: _jsxs("div", { className: "inner", children: [_jsxs("div", { className: "identicon", children: [Identicon, _jsx("div", { className: "index-icon ", children: index + 1 })] }), _jsxs("div", { children: [_jsxs("section", { className: "row", children: [_jsx("input", { disabled: isImported && disableEditIfImported, type: "text", value: editing ? editName : name, onChange: function (e) { return handleChange(e); }, onFocus: function () { return setEditing(true); }, onBlur: function () { return commitEdit(); }, onKeyUp: function (e) {
                                                if (e.key === "Enter") {
                                                    commitEdit();
                                                    e.currentTarget.blur();
                                                }
                                            } }), editing && (_jsxs("div", { style: { display: "flex" }, children: ["\u00A0", _jsx("button", { type: "button", className: "edit", onClick: function () { return commitEdit(); }, children: _jsx(FontAwesomeIcon, { icon: faCheck, transform: "grow-1", className: "icon" }) }), "\u00A0", _jsx("button", { type: "button", className: "edit", onClick: function () { return cancelEditing(); }, children: _jsx(FontAwesomeIcon, { icon: faXmark, transform: "grow-1" }) })] }))] }), _jsx("h5", { className: "full", children: _jsx("span", { children: address }) })] })] }) }), _jsx("div", { className: "action", children: isImported ? (_jsx(_Fragment, { children: _jsx(Button, { type: "text", iconLeft: faTimes, text: tRemove, onClick: function () { return openRemoveHandler(address); } }) })) : (_jsx(Button, { type: "text", iconLeft: faPlus, text: tImport, onClick: function () { return openConfirmHandler(address, index); } })) })] }));
};


