import HillClimbing from "./hillclimbing";
import { OptimizationStrategy } from "../optimizationstrategy";
import HillClimbingLimitedSideways from "./hillclimbinglimitedsideways";

interface AlgorithmRegistry {
  [algorithm: string]: any;
}

export const algorithms: AlgorithmRegistry = {
  "hill-climbing": HillClimbing,
  "hill-climbing-limited-sideways-moves": HillClimbingLimitedSideways,
};
