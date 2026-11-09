import { jsx as _jsx } from "react/jsx-runtime";
import { decodeAddress, blake2AsU8a } from "@polkadot/util-crypto";
var SIZE = 64;
var C = SIZE / 2;
export var Z = (SIZE / 64) * 5;
export var outerCircle = function (fill) { return ({
    cx: C,
    cy: C,
    fill: fill,
    r: C,
}); };
export var renderCircle = function (_a, key) {
    var cx = _a.cx, cy = _a.cy, fill = _a.fill, r = _a.r;
    return _jsx("circle", { cx: cx, cy: cy, fill: fill, r: r }, key);
};
var getRotation = function (ch) {
    var param_r;
    var param_rroot3o2;
    var param_ro2;
    var param_rroot3o4;
    var param_ro4;
    var param_r3o4;
    switch (ch) {
        case "generic":
        case "kusama":
        case "westend":
        default:
            param_r = 3;
            param_rroot3o2 = 2;
            param_ro2 = 2;
            param_rroot3o4 = 4;
            param_ro4 = 4;
            param_r3o4 = 4;
            break;
    }
    var r = (C / 4) * param_r;
    var rroot3o2 = (r * Math.sqrt(3)) / param_rroot3o2;
    var ro2 = r / param_ro2;
    var rroot3o4 = (r * Math.sqrt(3)) / param_rroot3o4;
    var ro4 = r / param_ro4;
    var r3o4 = (r * 3) / param_r3o4;
    return { r: r, r3o4: r3o4, ro2: ro2, ro4: ro4, rroot3o2: rroot3o2, rroot3o4: rroot3o4 };
};
export var getCircleXY = function (ch) {
    var _a = getRotation(ch), r = _a.r, r3o4 = _a.r3o4, ro2 = _a.ro2, ro4 = _a.ro4, rroot3o2 = _a.rroot3o2, rroot3o4 = _a.rroot3o4;
    return [
        [C, C - r],
        [C, C - ro2],
        [C - rroot3o4, C - r3o4],
        [C - rroot3o2, C - ro2],
        [C - rroot3o4, C - ro4],
        [C - rroot3o2, C],
        [C - rroot3o2, C + ro2],
        [C - rroot3o4, C + ro4],
        [C - rroot3o4, C + r3o4],
        [C, C + r],
        [C, C + ro2],
        [C + rroot3o4, C + r3o4],
        [C + rroot3o2, C + ro2],
        [C + rroot3o4, C + ro4],
        [C + rroot3o2, C],
        [C + rroot3o2, C - ro2],
        [C + rroot3o4, C - ro4],
        [C + rroot3o4, C - r3o4],
        [C, C],
    ];
};
export var SCHEMA = {
    target: {
        colors: [0, 28, 0, 0, 28, 0, 0, 28, 0, 0, 28, 0, 0, 28, 0, 0, 28, 0, 1],
        freq: 1,
    },
    cube: {
        colors: [0, 1, 3, 2, 4, 3, 0, 1, 3, 2, 4, 3, 0, 1, 3, 2, 4, 3, 5],
        freq: 20,
    },
    quazar: {
        colors: [1, 2, 3, 1, 2, 4, 5, 5, 4, 1, 2, 3, 1, 2, 4, 5, 5, 4, 0],
        freq: 16,
    },
    flower: {
        colors: [0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 3],
        freq: 32,
    },
    cyclic: {
        colors: [0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, 6],
        freq: 32,
    },
    vmirror: {
        colors: [0, 1, 2, 3, 4, 5, 3, 4, 2, 0, 1, 6, 7, 8, 9, 7, 8, 6, 10],
        freq: 128,
    },
    hmirror: {
        colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 8, 6, 7, 5, 3, 4, 2, 11],
        freq: 128,
    },
};
export var findScheme = function (d) {
    var out = 0;
    var schema = Object.values(SCHEMA).find(function (schema) {
        out += schema.freq;
        return d < out;
    });
    if (!schema) {
        throw new Error("Unable to find a valid schema.");
    }
    return schema;
};
var zeroHash = new Uint8Array();
var addressToId = function (address) {
    if (!zeroHash.length) {
        zeroHash = blake2AsU8a(new Uint8Array(32));
    }
    var pubKey = decodeAddress(address || "").toString();
    return blake2AsU8a(pubKey).map(function (x, i) { return (x + 256 - zeroHash[i]) % 256; });
};
export var getColors = function (address) {
    var total = Object.values(SCHEMA)
        .map(function (s) { return s.freq; })
        .reduce(function (a, b) { return a + b; });
    var id = addressToId(address);
    var d = Math.floor((id[30] + id[31] * 256) % total);
    var rot = (id[28] % 6) * 3;
    var sat = (Math.floor((id[29] * 70) / 256 + 26) % 80) + 30;
    var scheme = findScheme(d);
    var palette = Array.from(id).map(function (x, i) {
        var b = (x + (i % 28) * 58) % 256;
        if (b === 0) {
            return "#444";
        }
        else if (b === 255) {
            return "transparent";
        }
        var h = Math.floor(((b % 64) * 360) / 64);
        var l = [53, 15, 35, 75][Math.floor(b / 64)];
        return "hsl(".concat(h, ", ").concat(sat, "%, ").concat(l, "%)");
    });
    return scheme.colors.map(function (_, i) { return palette[scheme.colors[i < 18 ? (i + rot) % 18 : 18]]; });
};
