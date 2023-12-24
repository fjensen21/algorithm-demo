import { GridSquare } from "@/types/types";
import Grid from "../grid";
export interface OptimizationStrategy {
  optimize(problemSpace: Grid): GridSquare[][][];
}
