import { jsx as _jsx } from "react/jsx-runtime";
import { Cube } from "../Cube";
import { Dots } from "../Dots";
import { Line } from "../Line";
export var Loader = function (_a) {
    var type = _a.type, text = _a.text;
    switch (type) {
        case "cube":
            return _jsx(Cube, {});
        case "dots":
            return _jsx(Dots, {});
        case "line":
        default:
            return _jsx(Line, { text: text });
    }
};
