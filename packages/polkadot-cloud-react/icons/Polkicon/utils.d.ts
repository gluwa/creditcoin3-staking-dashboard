export type ChainName = "polkadot" | "kusama" | "westend" | "generic";
export interface Circle {
    cx: number;
    cy: number;
    fill: string;
    r: number;
}
export declare const Z: number;
export declare const outerCircle: (fill: string) => Circle;
export declare const renderCircle: ({ cx, cy, fill, r }: Circle, key: number) => import("react/jsx-runtime").JSX.Element;
export declare const getCircleXY: (ch: ChainName) => [
    number,
    number
][];
interface Scheme {
    freq: number;
    colors: number[];
}
export declare const SCHEMA: {
    [index: string]: Scheme;
};
export declare const findScheme: (d: number) => Scheme;
export declare const getColors: (address: string) => string[];
export {};
