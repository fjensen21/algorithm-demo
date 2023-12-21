import { OptimizationStrategy } from "./optimizationstrategy";

class OptimizationContext {
  private strategy: OptimizationStrategy;

  constructor(strategy: OptimizationStrategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy: OptimizationStrategy) {
    this.strategy = strategy;
  }

  executeOptimizer(problemSpace: any): any {
    return this.strategy.optimize(problemSpace);
  }
}
