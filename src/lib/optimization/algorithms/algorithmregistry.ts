import HillClimbing from "./hillclimbing";
import HillClimbingLimitedSideways from "./hillclimbinglimitedsideways";
import HillClimbingRandomRestarts from "./hillclimbingrandomrestarts";
import SimulatedAnnealing from "./simulatedannealing";

interface AlgorithmRegistry {
  [algorithm: string]: any;
}

export const algorithms: AlgorithmRegistry = {
  "hill-climbing": HillClimbing,
  "hill-climbing-limited-sideways-moves": HillClimbingLimitedSideways,
  "hill-climbing-random-restarts": HillClimbingRandomRestarts,
  "simulated-annealing": SimulatedAnnealing,
};

export const algorithmInfo = [
  {
    name: "hill-climbing",
    description:
      "Hill Climbing is a basic greedy algorithm. It 'looks' left and right and always picks the state with the highest evaluation. If no action improves its current state it stops. This often finds local maxima quickly but struggles to find absolute maxima.",
  },
  {
    name: "hill-climbing-limited-sideways-moves",
    description:
      "Improves on Hill Climbing by allowing sideways moves. This gives the agent an opportunity to move upwards from a shoulder. Sideways moves must be limited in order to prevent an infinite loop on plateaus.",
  },
  {
    name: "hill-climbing-random-restarts",
    description:
      "Introducing random restarts allows hill climbing to bias towards exploration over exploitation which statiscally leads to stronger results. This algorithm introduces a number of random restarts when a maxima is found.",
  },
  {
    name: "simulated-annealing",
    description:
      "!! Experimental: Cooling function in BETA !! Simulated annealing gradually refines solutions by probabilistically accepting worse ones to escape local optima, while hill climbing with random restarts aggressively explores by repeatedly starting from random points to find the global optimum.",
  },
];
