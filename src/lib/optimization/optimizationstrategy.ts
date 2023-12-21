import { GridSquare } from "@/types/types";
export interface OptimizationStrategy {
  optimize(problemSpace: GridSquare[][]): any;
}
