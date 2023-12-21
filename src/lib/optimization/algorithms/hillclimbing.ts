import { OptimizationStrategy } from "../optimizationstrategy";
import AlgorithmRegistry from "./algorithmregistry";
import { GridSquare } from "@/types/types";

class HillClimbing implements OptimizationStrategy {
  optimize(problemSpace: GridSquare[][]) {}
}

AlgorithmRegistry.registerAlgorithm("hill-climbing", HillClimbing);
