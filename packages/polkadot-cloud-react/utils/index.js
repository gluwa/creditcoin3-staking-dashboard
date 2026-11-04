export var valEmpty = function (t, v) {
    return t ? " ".concat(v) : "";
};
export var valOr = function (t, v, w) {
    return t ? " ".concat(v) : " ".concat(w);
};
export var onMouseHandlers = function (props) {
    var onClick = props.onClick, onMouseOver = props.onMouseOver, onMouseMove = props.onMouseMove, onMouseOut = props.onMouseOut;
    return {
        onClick: typeof onClick == "function"
            ? function (e) { return onClick(e); }
            : undefined,
        onMouseOver: typeof onMouseOver == "function"
            ? function (e) { return onMouseOver(e); }
            : undefined,
        onMouseMove: typeof onMouseMove == "function"
            ? function (e) { return onMouseMove(e); }
            : undefined,
        onMouseOut: typeof onMouseOut == "function"
            ? function (e) { return onMouseOut(e); }
            : undefined,
    };
};


