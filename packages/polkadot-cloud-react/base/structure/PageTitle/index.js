import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useRef, useState } from "react";
import { valEmpty } from "../../../utils";
import { ButtonSecondary } from "../../../buttons/ButtonSecondary";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { PageTitleTabs } from "../PageTitleTabs";
import "@polkadot-cloud/core/css/base/structure/PageTitle/index.css";
export var PageTitle = function (_a) {
    var title = _a.title, button = _a.button, _b = _a.tabs, tabs = _b === void 0 ? [] : _b;
    var _c = useState(false), sticky = _c[0], setSticky = _c[1];
    var ref = useRef(null);
    useEffect(function () {
        var cachedRef = ref.current;
        var observer = new IntersectionObserver(function (_a) {
            var e = _a[0];
            setSticky(e.intersectionRatio < 1);
        }, { threshold: [1], rootMargin: "-1px 0px 0px 0px" });
        if (cachedRef) {
            observer.observe(cachedRef);
        }
        return function () {
            if (cachedRef) {
                observer.unobserve(cachedRef);
            }
        };
    }, [sticky]);
    return (_jsxs(_Fragment, { children: [_jsx("div", { className: "core-page-title-hide-scrollable" }), _jsxs("header", { ref: ref, className: "core-page-title".concat(valEmpty(sticky, "sticky")), children: [_jsxs("section", { className: "title", children: [_jsx("div", { children: _jsx("h1", { children: title }) }), _jsx("div", { className: "right", children: button && (_jsx(ButtonSecondary, { text: button.title, onClick: function () { return button.onClick(); }, iconRight: faBars, iconTransform: "shrink-4", lg: true })) })] }), tabs.length > 0 && _jsx(PageTitleTabs, { sticky: sticky, tabs: tabs })] })] }));
};
PageTitle.displayName = "PageTitle";


