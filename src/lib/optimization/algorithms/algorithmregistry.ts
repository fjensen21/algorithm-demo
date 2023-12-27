import HillClimbing from "./hillclimbing";
import { OptimizationStrategy } from "../optimizationstrategy";

interface AlgorithmRegistry {
  [algorithm: string]: any;
}

export const algorithms: AlgorithmRegistry = {
  "hill-climbing": HillClimbing,
};
