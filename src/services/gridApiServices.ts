import { GridSquare } from "../../types/types";

export async function getNewProblemSpace() {
  try {
    const res = await fetch("/api/generateproblemspace");
    const data = await res.json();

    return data.grid;
  } catch (error) {
    console.error("Error fetching data", error);
    throw error;
  }
}

export async function solveProblem(grid: GridSquare[][], algorithm: string) {
  try {
    const res = await fetch("/api/solveproblem", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ grid, algorithm }),
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching data", error);
    throw error;
  }
}
