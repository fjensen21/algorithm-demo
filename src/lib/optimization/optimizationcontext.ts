import { GridSquare } from "@/types/types";
import { OptimizationStrategy } from "./optimizationstrategy";
import Grid from "../grid";

export default class OptimizationContext {
  private strategy: OptimizationStrategy;

  constructor(strategy: OptimizationStrategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy: OptimizationStrategy) {
    this.strategy = strategy;
  }

  executeOptimizer(problemSpace: Grid): GridSquare[][][] {
    return this.strategy.optimize(problemSpace);
  }
}
