import { jsx as _jsx } from "react/jsx-runtime";
import { ButtonTab } from "../../../buttons/ButtonTab";
import { valEmpty } from "../../../utils";
import "@polkadot-cloud/core/css/base/structure/PageTitleTabs/index.css";
export var PageTitleTabs = function (_a) {
    var sticky = _a.sticky, _b = _a.tabs, tabs = _b === void 0 ? [] : _b;
    return (_jsx("section", { className: "core-page-title-tabs".concat(valEmpty(sticky, "sticky")), children: _jsx("div", { className: "scroll", children: _jsx("div", { className: "inner", children: tabs.map(function (_a, i) {
                    var active = _a.active, onClick = _a.onClick, title = _a.title, badge = _a.badge;
                    return (_jsx(ButtonTab, { active: !!active, onClick: function () { return onClick(); }, title: title, badge: badge }, "page_tab_".concat(i)));
                }) }) }) }));
};
