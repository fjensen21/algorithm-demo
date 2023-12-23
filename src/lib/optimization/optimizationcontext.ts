import { GridSquare } from "@/types/types";
import { OptimizationStrategy } from "./optimizationstrategy";

export default class OptimizationContext {
  private strategy: OptimizationStrategy;

  constructor(strategy: OptimizationStrategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy: OptimizationStrategy) {
    this.strategy = strategy;
  }

  executeOptimizer(problemSpace: GridSquare[][]): any {
    return this.strategy.optimize(problemSpace);
  }
}
