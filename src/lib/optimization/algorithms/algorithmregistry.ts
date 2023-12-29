import HillClimbing from "./hillclimbing";
import HillClimbingLimitedSideways from "./hillclimbinglimitedsideways";
import HillClimbingRandomRestarts from "./hillclimbingrandomrestarts";

interface AlgorithmRegistry {
  [algorithm: string]: any;
}

export const algorithms: AlgorithmRegistry = {
  "hill-climbing": HillClimbing,
  "hill-climbing-limited-sideways-moves": HillClimbingLimitedSideways,
  "hill-climbing-random-restarts": HillClimbingRandomRestarts,
};
