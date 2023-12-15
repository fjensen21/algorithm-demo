import Grid from "@/lib/grid";

test("confirms shape of initialized grid matches default cols and rows", () => {
  let testGrid = new Grid();
  expect(testGrid.grid.length).toBe(testGrid.rows);
  expect(testGrid.grid[0].length).toBe(testGrid.cols);
  expect(testGrid.grid[testGrid.rows - 1].length).toBe(testGrid.cols);
});
