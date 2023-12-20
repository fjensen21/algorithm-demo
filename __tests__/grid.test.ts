import Grid from "@/lib/grid";

test("confirms shape of initialized grid matches default cols and rows", () => {
  const testGrid = new Grid();
  expect(testGrid.grid.length).toBe(testGrid.rows);
  expect(testGrid.grid[0].length).toBe(testGrid.cols);
  expect(testGrid.grid[testGrid.rows - 1].length).toBe(testGrid.cols);
});

describe("Mask probabilities", () => {
  test("preferred action up masks properly", () => {
    const testGrid = new Grid();
    expect(testGrid.maskProbabilities("up", [0, 0, 0])).toStrictEqual([
      0, 0.05, 0.1,
    ]);
  });

  test("preferred action down masks properly", () => {
    const testGrid = new Grid();
    expect(testGrid.maskProbabilities("down", [0, 0, 0])).toStrictEqual([
      0.1, 0.05, 0,
    ]);
  });

  test("preferred action flat masks properly", () => {
    const testGrid = new Grid();
    expect(testGrid.maskProbabilities("flat", [0, 0, 0])).toStrictEqual([
      0.1, 0, 0.1,
    ]);
  });
});

describe("Normalize probabilities", () => {
  test("List of 3 non-zero probabilities", () => {
    const testGrid = new Grid();
    expect(testGrid.normalizeProbabilities([1, 8, 1])).toStrictEqual([
      0.1, 0.8, 0.1,
    ]);
  });

  test("List of 3 probabilities with a 0", () => {
    const testGrid = new Grid();
    expect(testGrid.normalizeProbabilities([1, 9, 0])).toStrictEqual([
      0.1, 0.9, 0.0,
    ]);
  });
});
