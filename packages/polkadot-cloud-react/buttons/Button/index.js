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
import { ButtonPrimary } from "../ButtonPrimary";
import { ButtonPrimaryInvert, } from "../ButtonPrimaryInvert";
import { ButtonSecondary } from "../ButtonSecondary";
import { ButtonTertiary } from "../ButtonTertiary";
import { ButtonMono } from "../ButtonMono";
import { ButtonMonoInvert } from "../ButtonMonoInvert";
import { ButtonSubmitInvert, } from "../ButtonSubmitInvert";
import { ButtonText } from "../ButtonText";
import { ButtonSubmit } from "../ButtonSubmit";
import { ButtonHelp } from "../ButtonHelp";
import { ButtonTab } from "../ButtonTab";
import { ButtonOption } from "../ButtonOption";
export var Button = function (props) {
    var type = props.type;
    switch (type) {
        case "help": {
            var p = props;
            return _jsx(ButtonHelp, __assign({}, p));
        }
        case "mono": {
            var p = props;
            return _jsx(ButtonMono, __assign({}, p));
        }
        case "monoInvert": {
            var p = props;
            return _jsx(ButtonMonoInvert, __assign({}, p));
        }
        case "option": {
            var p = props;
            return _jsx(ButtonOption, __assign({}, p));
        }
        case "primaryInvert": {
            var p = props;
            return _jsx(ButtonPrimaryInvert, __assign({}, p));
        }
        case "secondary": {
            var p = props;
            return _jsx(ButtonSecondary, __assign({}, p));
        }
        case "submit": {
            var p = props;
            return _jsx(ButtonSubmit, __assign({}, p));
        }
        case "submitInvert": {
            var p = props;
            return _jsx(ButtonSubmitInvert, __assign({}, p));
        }
        case "tab": {
            var p = props;
            return _jsx(ButtonTab, __assign({}, p));
        }
        case "tertiary": {
            var p = props;
            return _jsx(ButtonTertiary, __assign({}, p));
        }
        case "text": {
            var p = props;
            return _jsx(ButtonText, __assign({}, p));
        }
        case "primary":
        default: {
            var p = props;
            return _jsx(ButtonPrimary, __assign({}, p));
        }
    }
};
