import { OptimizationStrategy } from "../optimizationstrategy";

export default class AlgorithmRegistry {
  private static algorithms: { [key: string]: new () => OptimizationStrategy } =
    {};

  /**
   * Registers an algorithm
   *
   * @param name the name you wish to register the algorithm with
   * @param algorithm the algorithm you wish to register
   */
  static registerAlgorithm(
    name: string,
    algorithm: new () => OptimizationStrategy
  ) {
    this.algorithms[name] = algorithm;
  }

  /**
   * Gets an algorithm instance from the registry given its name key
   *
   * @param name the name of the algorithm you want to get
   * @returns an instance of the algorithm you requested or null if that algorithm isn't found
   */
  static getAlgorithm(name: string): OptimizationStrategy | null {
    const algorithm = this.algorithms[name];
    return algorithm ? new algorithm() : null;
  }

  /**
   * Gets all of the registered algorithm names
   *
   * @returns the names of all registered algorithms
   */
  static getAllAlgorithms(): string[] {
    return Object.keys(this.algorithms);
  }
}
