import { ComponentBaseWithClassName } from "../../../utils/types";
import { PieProps } from "./Pie";
export type ChartType = "pie";
export type Props = ComponentBaseWithClassName & {
    type?: ChartType;
} & PieProps;
export declare const Chart: (props: Props) => import("react/jsx-runtime").JSX.Element;
