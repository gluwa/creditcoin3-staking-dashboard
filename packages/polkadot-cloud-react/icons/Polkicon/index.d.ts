interface PolkiconProps {
    size?: number | string;
    address: string;
    copy?: boolean;
    colors?: string[];
    outerColor?: string;
    copyTimeout?: number;
}
export declare const Polkicon: ({ size, address, copy, colors: initialColors, outerColor, copyTimeout, }: PolkiconProps) => import("react/jsx-runtime").JSX.Element;
export {};
