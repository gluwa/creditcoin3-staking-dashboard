import { jsx as _jsx } from "react/jsx-runtime";
import { valEmpty } from "../../../utils";
import "@polkadot-cloud/core/css/base/structure/Grid/index.css";
export var Grid = function (_a) {
    var alignItems = _a.alignItems, children = _a.children, column = _a.column, expanded = _a.expanded, justify = _a.justify, lg = _a.lg, md = _a.md, row = _a.row, sm = _a.sm, style = _a.style;
    var isRow = row || !column;
    var classes =
    (!isRow ? "column" : "row") +
        valEmpty(isRow && expanded, "expanded") +
        valEmpty(justify, justify) +
        valEmpty(alignItems, "align-" + alignItems) +
        valEmpty(!isRow && !!sm, "sm-" + sm) +
        valEmpty(!isRow && !!md, "md-" + md) +
        valEmpty(!isRow && !!lg, "lg-" + lg);
    return (_jsx("div", { style: style, className: classes, children: children }));
};
