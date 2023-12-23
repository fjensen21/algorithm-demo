import Grid from "@/lib/grid";
import HillClimbing from "@/lib/optimization/algorithms/hillclimbing";

describe("hill climbing setup", () => {
  test("first and last grids are correct", () => {
    const testGrid = new Grid().grid;
    const moveHistory = new HillClimbing().optimize(testGrid);
    const firstFrame = moveHistory[0];
    const lastFrame = moveHistory[testGrid.length - 1];
    expect(firstFrame[0][0]).toBe(2);
    expect(lastFrame[testGrid.length - 1][0]).toBe(2);
    expect(lastFrame[0][0]).toBe([1, 0]);
  });
});
