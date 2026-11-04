export type PieProps = {
    diameter: number;
    items: {
        value: number;
        color: string;
    }[];
    innerRadius?: number;
    speed?: number;
};
export declare const Pie: ({ diameter, items, innerRadius, speed, }: PieProps) => import("react/jsx-runtime").JSX.Element;
