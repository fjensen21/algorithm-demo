import Grid from "@/lib/grid";
import { GridSquare } from "@/types/types";

test("confirms shape of initialized grid matches default cols and rows", () => {
  const testGrid = new Grid(
    Grid.getEmptyGrid(Grid.defaultRows, Grid.defaultCols)
  );
  expect(testGrid.getGrid().length).toBe(Grid.defaultRows);
  expect(testGrid.getGrid()[0].length).toBe(Grid.defaultCols);
  expect(testGrid.getGrid()[Grid.defaultRows - 1].length).toBe(
    Grid.defaultCols
  );
});

describe("Mask probabilities", () => {
  test("preferred action up masks properly", () => {
    const testGrid = new Grid(
      Grid.getEmptyGrid(Grid.defaultRows, Grid.defaultCols)
    );
    expect(testGrid.maskProbabilities("up", [0, 0, 0])).toStrictEqual([
      0, 0.05, 0.1,
    ]);
  });

  test("preferred action down masks properly", () => {
    const testGrid = new Grid(
      Grid.getEmptyGrid(Grid.defaultRows, Grid.defaultCols)
    );
    expect(testGrid.maskProbabilities("down", [0, 0, 0])).toStrictEqual([
      0.1, 0.05, 0,
    ]);
  });

  test("preferred action flat masks properly", () => {
    const testGrid = new Grid(
      Grid.getEmptyGrid(Grid.defaultRows, Grid.defaultCols)
    );
    expect(testGrid.maskProbabilities("flat", [0, 0, 0])).toStrictEqual([
      0.1, 0, 0.1,
    ]);
  });
});

describe("Normalize probabilities", () => {
  test("List of 3 non-zero probabilities", () => {
    const testGrid = new Grid(
      Grid.getEmptyGrid(Grid.defaultRows, Grid.defaultCols)
    );
    expect(testGrid.normalizeProbabilities([1, 8, 1])).toStrictEqual([
      0.1, 0.8, 0.1,
    ]);
  });

  test("List of 3 probabilities with a 0", () => {
    const testGrid = new Grid(
      Grid.getEmptyGrid(Grid.defaultRows, Grid.defaultCols)
    );
    expect(testGrid.normalizeProbabilities([1, 9, 0])).toStrictEqual([
      0.1, 0.9, 0.0,
    ]);
  });
});

describe("Get empty grid generates the proper grid", () => {
  test("Generates grid matching col and rows", () => {
    const testGrid = new Grid(
      Grid.getEmptyGrid(Grid.defaultRows, Grid.defaultCols)
    );
    const emptyGrid = new Grid(
      Grid.getEmptyGrid(Grid.defaultRows, Grid.defaultCols)
    );

    if (Grid.defaultCols > 0 && Grid.defaultRows > 0) {
      expect(emptyGrid.getGrid().length).toBe(Grid.defaultRows);
      expect(emptyGrid.getGrid()[0].length).toBe(Grid.defaultCols);
    }
  });
});

describe("Get grid boundaries", () => {
  const testGrid = new Grid([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ]);
  test("get left boundary", () => {
    const boundary = testGrid.getBoundary("left");
    expect(boundary).toBe(0);
  });

  test("get right boundary", () => {
    const boundary = testGrid.getBoundary("right");
    expect(boundary).toBe(2);
  });

  test("get top boundary", () => {
    const boundary = testGrid.getBoundary("top");
    expect(boundary).toBe(0);
  });

  test("get bottom boundary", () => {
    const boundary = testGrid.getBoundary("bottom");
    expect(boundary).toBe(2);
  });
});

describe("Set and get agent start position", () => {
  test("getAgentStartPosition returns null if no agent start position is set", () => {
    const testGrid = new Grid([
      [0, 0, 0],
      [1, 1, 1],
      [0, 0, 0],
    ]);

    expect(testGrid.getAgentPosition()).toBe(null);
  });
  test("Sets correct start position given a valid column", () => {
    const testGrid = new Grid([
      [0, 0, 0],
      [1, 1, 1],
      [0, 0, 0],
    ]);

    const startPositionSet = testGrid.setAgentStartPosition(1);
    expect(startPositionSet).toBe(true);

    const expectedGrid = [
      [0, 2, 0],
      [1, 1, 1],
      [0, 0, 0],
    ];

    expect(testGrid.getGrid()).toStrictEqual(expectedGrid);

    const expectedAgentRow = 0;
    const expectedAgentCol = 1;

    const actualPosition = testGrid.getAgentPosition();
    expect(actualPosition).not.toBe(null);
    if (actualPosition) {
      const { row, col } = actualPosition;
      expect(row).toBe(expectedAgentRow);
      expect(col).toBe(expectedAgentCol);
    }
  });
  test("Returns false if a start position is already set", () => {
    const testGrid = new Grid([
      [0, 0, 0],
      [1, 1, 1],
      [0, 0, 0],
    ]);

    const startPositionSet = testGrid.setAgentStartPosition(1);
    expect(startPositionSet).toBe(true);

    const newStartPositionSet = testGrid.setAgentStartPosition(2);
    expect(newStartPositionSet).toBe(false);

    const expectedGrid = [
      [0, 2, 0],
      [1, 1, 1],
      [0, 0, 0],
    ];

    expect(testGrid.getGrid()).toStrictEqual(expectedGrid);
  });
});

describe("Move function", () => {
  test("Move right properly moves on flat terrain", () => {
    const testGrid = new Grid([
      [0, 0, 0],
      [1, 1, 1],
      [0, 0, 0],
    ]);

    testGrid.setAgentStartPosition(1);
    testGrid.move("right");

    const expectedGrid = [
      [0, 0, 2],
      [1, 1, 1],
      [0, 0, 0],
    ];

    expect(testGrid.getGrid()).toStrictEqual(expectedGrid);
  });

  test("Move left properly moves on flat terrain", () => {
    const testGrid = new Grid([
      [0, 0, 0],
      [1, 1, 1],
      [0, 0, 0],
    ]);

    testGrid.setAgentStartPosition(1);
    testGrid.move("left");

    const expectedGrid = [
      [2, 0, 0],
      [1, 1, 1],
      [0, 0, 0],
    ];

    expect(testGrid.getGrid()).toStrictEqual(expectedGrid);
  });

  test("Move right properly moves on down terrain", () => {
    const testGrid = new Grid([
      [0, 0, 0],
      [1, 1, 0],
      [0, 0, 1],
    ]);

    testGrid.setAgentStartPosition(1);
    testGrid.move("right");

    const expectedGrid = [
      [0, 0, 0],
      [1, 1, 2],
      [0, 0, 1],
    ];

    expect(testGrid.getGrid()).toStrictEqual(expectedGrid);
  });

  test("Move left properly moves on down terrain", () => {
    const testGrid = new Grid([
      [0, 0, 0],
      [0, 1, 1],
      [1, 0, 0],
    ]);

    testGrid.setAgentStartPosition(1);
    testGrid.move("left");

    const expectedGrid = [
      [0, 0, 0],
      [2, 1, 1],
      [1, 0, 0],
    ];

    expect(testGrid.getGrid()).toStrictEqual(expectedGrid);
  });

  test("Throws error on left boundary", () => {
    const testGrid = new Grid([
      [0, 0, 0],
      [1, 1, 0],
      [0, 0, 1],
    ]);

    testGrid.setAgentStartPosition(0);

    expect(() => testGrid.move("left")).toThrow(
      "Cannot move further to the left at boundary"
    );
  });

  test("Throws error on right boundary", () => {
    const testGrid = new Grid([
      [0, 0, 0],
      [1, 1, 0],
      [0, 0, 1],
    ]);

    testGrid.setAgentStartPosition(2);

    expect(() => testGrid.move("right")).toThrow(
      "Cannot move further to the right at boundary"
    );
  });
});

describe("Constructor behaves right", () => {
  test("Any existing agents are cleared from grid arrays on construct", () => {
    const gridArray: GridSquare[][] = [
      [0, 2, 0],
      [0, 0, 0],
      [0, 2, 0],
    ];
    const testGrid = new Grid(gridArray);

    const expectedGridArray = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];
    expect(testGrid.getGrid()).toStrictEqual(expectedGridArray);
  });
});

describe("Test getNeighborAgentPosition", () => {
  test("Returns null at left boundary", () => {
    const testGrid = new Grid([
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 1, 1, 0, 1],
      [1, 0, 0, 1, 0],
      [0, 0, 0, 0, 0],
    ]);

    testGrid.setAgentStartPosition(0);

    const nextAgentPosition = testGrid.getNeighborAgentPosition("left");
    expect(nextAgentPosition).toBeNull();
  });
  test("Returns null at right boundary", () => {
    const testGrid = new Grid([
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 1, 1, 0, 1],
      [1, 0, 0, 1, 0],
      [0, 0, 0, 0, 0],
    ]);

    testGrid.setAgentStartPosition(4);

    const nextAgentPosition = testGrid.getNeighborAgentPosition("right");
    expect(nextAgentPosition).toBeNull();
  });

  test("Returns correct with standard movements", () => {
    const testGrid = new Grid([
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 1, 1, 0, 1],
      [1, 0, 0, 1, 0],
      [0, 0, 0, 0, 0],
    ]);

    testGrid.setAgentStartPosition(1);

    let nextAgentPosition = testGrid.getNeighborAgentPosition("right");
    let expectedPosition = { col: 2, row: 1 };
    expect(nextAgentPosition).toStrictEqual(expectedPosition);

    nextAgentPosition = testGrid.getNeighborAgentPosition("left");
    expectedPosition = { col: 0, row: 2 };
    expect(nextAgentPosition).toStrictEqual(expectedPosition);

    testGrid.move("right");
    testGrid.move("right");

    nextAgentPosition = testGrid.getNeighborAgentPosition("left");
    expectedPosition = { col: 2, row: 1 };
    expect(nextAgentPosition).toStrictEqual(expectedPosition);

    nextAgentPosition = testGrid.getNeighborAgentPosition("right");
    expectedPosition = { col: 4, row: 1 };
    expect(nextAgentPosition).toStrictEqual(expectedPosition);
  });

  test("Returns correct with with movements near top", () => {
    const testGrid = new Grid([
      [0, 0, 0, 0, 0],
      [0, 1, 1, 1, 0],
      [1, 0, 0, 0, 1],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ]);

    testGrid.setAgentStartPosition(0);

    let nextAgentPosition = testGrid.getNeighborAgentPosition("right");
    let expectedPosition = { col: 1, row: 0 };
    expect(nextAgentPosition).toStrictEqual(expectedPosition);

    testGrid.move("right");
    testGrid.move("right");
    testGrid.move("right");

    nextAgentPosition = testGrid.getNeighborAgentPosition("left");
    expectedPosition = { col: 2, row: 0 };
    expect(nextAgentPosition).toStrictEqual(expectedPosition);

    nextAgentPosition = testGrid.getNeighborAgentPosition("right");
    expectedPosition = { col: 4, row: 1 };
    expect(nextAgentPosition).toStrictEqual(expectedPosition);
  });
});

describe("Test evaluate a state", () => {
  test("Evaluate a standard agent state on a grid", () => {
    const testGrid = new Grid([
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ]);

    expect(testGrid.evaluteState({ row: 2, col: 2 })).toBe(3);
    expect(testGrid.evaluteState({ row: 0, col: 2 })).toBe(5);
    expect(testGrid.evaluteState({ row: 4, col: 2 })).toBe(1);
  });

  test("Evaluate states passed from getNeighborAgentPosition", () => {
    const testGrid = new Grid([
      [0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0],
      [0, 1, 0, 0, 1],
      [0, 0, 1, 1, 0],
      [0, 0, 0, 0, 0],
    ]);

    testGrid.setAgentStartPosition(0);

    expect(
      testGrid.evaluteState(testGrid.getNeighborAgentPosition("left"))
    ).toBe(-1);

    expect(
      testGrid.evaluteState(testGrid.getNeighborAgentPosition("right"))
    ).toBe(4);
  });
});
