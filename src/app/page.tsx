"use client";
import GridCanvas from "@/components/grid/GridCanvas";
import { PerformanceProfile } from "@/lib/optimization/performanceprofiler";
import {
  getAlgorithms,
  getNewProblemSpace,
  solveProblem,
} from "@/services/gridApiServices";
import { GridSquare } from "@/types/types";
import { FormEvent, useEffect, useState } from "react";

const getDefaultGrid = (): GridSquare[][] => {
  const rows = 80;
  const cols = 30;
  const array2D = new Array(rows);

  for (let i = 0; i < rows; i++) {
    array2D[i] = new Array(cols);
    for (let j = 0; j < cols; j++) {
      array2D[i][j] = 0;
    }
  }
  return array2D;
};

const page = () => {
  const [running, setRunning] = useState(false);

  const [availableAlgorithms, setAvailableAlgorithms] = useState<
    {
      name: string;
      description: string;
    }[]
  >([]);

  const [performance, setPerformance] = useState<PerformanceProfile | null>(
    null
  );

  const [currentGrid, setCurrentGrid] = useState<GridSquare[][]>(
    getDefaultGrid()
  );
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<{
    name: string;
    description: string;
  }>();

  const fetchAlgorithmsList = async () => {
    try {
      const algorithms = await getAlgorithms();
      setAvailableAlgorithms(algorithms);
      setSelectedAlgorithm(algorithms[0]);
    } catch (error) {
      console.error("Error getting available algorithms");
      throw error;
    }
  };

  const displayMoveHistory = async (moveHistory: GridSquare[][][]) => {
    const sleep = (delay: number) =>
      new Promise((resolve) => setTimeout(resolve, delay));
    for (let i = 0; i < moveHistory.length; i++) {
      await sleep(100);
      setCurrentGrid([...moveHistory[i]]);
    }
  };

  const handleAlgorithmSelected = (event: any) => {
    const selectedAlgorithmName = event.target.value;
    const selectedAlgorithm = availableAlgorithms.find(
      (algorithm) => algorithm.name === selectedAlgorithmName
    );
    setSelectedAlgorithm(selectedAlgorithm!);
  };

  const handleGenerateProblemSpace = () => {
    const fetchAndSetData = async () => {
      try {
        const gridData = await getNewProblemSpace();
        setCurrentGrid(gridData);
      } catch (error) {
        console.error("Error getting new grid");
        throw error;
      }
    };
    fetchAndSetData();
  };

  useEffect(() => {
    fetchAlgorithmsList();
    handleGenerateProblemSpace();
  }, []);

  const handleRunSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setRunning(true);
    try {
      // TODO: Make sure an algorithm is selected first
      const data = await solveProblem(currentGrid, selectedAlgorithm?.name!);
      const { moveHistory, performanceData } = data;
      await displayMoveHistory(moveHistory);
      setPerformance(performanceData);
    } catch (error) {
      console.error("Error running simulation try again");
      throw error;
    } finally {
      setRunning(false);
    }
  };

  return (
    <div className="m-4">
      <h1 className="text-4xl m-4">Local Optimization Algorithms Simulator</h1>
      <div className="grid grid-cols-3 h-screen">
        <div id="grid" className="col-span-2">
          <GridCanvas grid={currentGrid} />
        </div>
        <div id="side-menu" className="col-span-1 mx-4">
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form className="card-body" onSubmit={handleRunSubmit}>
              <h2 className="font-bold text-xl">Run an algorithm</h2>
              <div className="form-control">
                <select
                  className="select select-bordered"
                  name=""
                  id=""
                  onChange={handleAlgorithmSelected}
                >
                  {availableAlgorithms.map((algorithm, index) => (
                    <option key={index}>{algorithm.name}</option>
                  ))}
                </select>
              </div>
              <p className="m-2 ">
                {selectedAlgorithm
                  ? selectedAlgorithm.description
                  : "Select an algorithm to see its properties..."}
              </p>
              <div className="form-control mt-6">
                <button
                  className="btn btn-primary"
                  disabled={running}
                  type="submit"
                >
                  Run simulation
                </button>
              </div>
            </form>
          </div>
          <div className="card w-full max-w-sm shadow-2xl mt-4">
            <div className="card-body">
              <h2 className="font-bold text-xl">Generate a new grid</h2>
              <button
                className="btn btn-secondary"
                disabled={running}
                onClick={handleGenerateProblemSpace}
              >
                Generate Random
              </button>
            </div>
          </div>
        </div>
        <div className="col-span-3 row-start-2">
          <div className="card m-4 shadow-xl bg-base-300">
            <div className="card-title mt-4 mx-4">Performance</div>
            <div className="card-body">
              {performance ? (
                <div className="overflow-x-auto">
                  <table className="table">
                    {/* head */}
                    <thead>
                      <tr>
                        <th className="text-xl font-semibold">Metric</th>
                        <th className="text-xl font-semibold">Result</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* row 1 */}
                      <tr>
                        <td className="text-xl">Elapsed Time</td>
                        <td className="text-xl">
                          {performance.elapsedTime.toFixed(2)} seconds
                        </td>
                      </tr>
                      {/* row 2 */}
                      <tr>
                        <td className="text-xl">Absolute Max Point</td>
                        <td className="text-xl">{performance.absoluteMax}</td>
                      </tr>
                      {/* row 3 */}
                      <tr>
                        <td className="text-xl">Absolute Min Point</td>
                        <td className="text-xl">{performance.absoluteMin}</td>
                      </tr>
                      {/* row 4 */}
                      <tr>
                        <td className="text-xl">End Point</td>
                        <td className="text-xl">{performance.endpoint}</td>
                      </tr>
                      {/* row 5 */}
                      <tr>
                        <td className="text-xl">Distance from Top</td>
                        <td className="text-xl">
                          {(
                            (performance.endpoint / performance.absoluteMax) *
                            100
                          ).toFixed(2)}
                          %
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="font-light">
                  Run a simulation to see performance statistics
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
