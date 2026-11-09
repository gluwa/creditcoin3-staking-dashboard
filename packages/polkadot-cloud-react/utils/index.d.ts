import { MouseEvent } from "react";
import { AnyJson } from "./types";
export declare const valEmpty: (t: boolean | string | undefined, v: string) => string;
export declare const valOr: (t: boolean | string | undefined, v: string, w: string) => string;
export declare const onMouseHandlers: (props: AnyJson) => {
    onClick: (e: MouseEvent<HTMLButtonElement>) => any;
    onMouseOver: (e: MouseEvent<HTMLButtonElement>) => any;
    onMouseMove: (e: MouseEvent<HTMLButtonElement>) => any;
    onMouseOut: (e: MouseEvent<HTMLButtonElement>) => any;
};
