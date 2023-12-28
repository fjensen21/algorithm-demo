import Grid from "@/lib/grid";
import { PerformanceProfiler } from "@/lib/optimization/performanceprofiler";

describe("runProfiler functions correctly", () => {
  const profiler = new PerformanceProfiler();
  const testGrid = new Grid([
    [0, 0, 0],
    [1, 1, 1],
    [0, 0, 0],
  ]);
  testGrid.setAgentStartPosition(0);
  const moveHistory = profiler.runProfiler(testGrid, (problemSpace: Grid) => {
    const history = [];
    history.push(problemSpace.getGrid());
    problemSpace.move("right");
    history.push(problemSpace.getGrid());
    problemSpace.move("right");
    history.push(problemSpace.getGrid());
    return history;
  });

  test("returns correct moveHistory", () => {
    const expectedMoveHistory = [
      [
        [2, 0, 0],
        [1, 1, 1],
        [0, 0, 0],
      ],
      [
        [0, 2, 0],
        [1, 1, 1],
        [0, 0, 0],
      ],
      [
        [0, 0, 2],
        [1, 1, 1],
        [0, 0, 0],
      ],
    ];

    expect(moveHistory).toStrictEqual(expectedMoveHistory);
  });

  test("elapsedTime to be populated", () => {
    expect(profiler.elapsedTime).not.toBeUndefined();
  });

  test("agent start and end position to be correct", () => {
    const expectedAgentStartPosition = { col: 0, row: 0 };
    const expectedAgentEndPosition = { col: 2, row: 0 };

    expect(profiler.agentStartPosition).toStrictEqual(
      expectedAgentStartPosition
    );

    expect(profiler.agentEndPosition).toStrictEqual(expectedAgentEndPosition);
  });
});

describe("getProfile functions correctly", () => {
  const profiler = new PerformanceProfiler();
  const testGrid = new Grid([
    [0, 0, 0],
    [1, 1, 1],
    [0, 0, 0],
  ]);
  testGrid.setAgentStartPosition(0);
  const moveHistory = profiler.runProfiler(testGrid, (problemSpace: Grid) => {
    const history = [];
    history.push(problemSpace.getGrid());
    problemSpace.move("right");
    history.push(problemSpace.getGrid());
    problemSpace.move("right");
    history.push(problemSpace.getGrid());
    return history;
  });

  const performanceProfile = profiler.getProfile();

  expect(performanceProfile).not.toBeNull();

  test("Absolute Max and Min are correct", () => {
    const expectedAbsMax = 2;
    const expectedAbsMin = 2;

    expect(performanceProfile!["absoluteMax"]).toBe(expectedAbsMax);
    expect(performanceProfile!["absoluteMin"]).toBe(expectedAbsMin);
  });
});
