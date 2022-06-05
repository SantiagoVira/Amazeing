import { SimpleGrid } from "@chakra-ui/react";
import { useEffect } from "react";
import { useCallback } from "react";
import { useState } from "react";
import Cell from "./Cell";
import {
  boxSize,
  pixels,
  between,
  sum,
  randomShuffle,
  keyDownHandler,
} from "./utils";

// The function to recursively cut up a maze
function CarveFrom(oldX, oldY, grid) {
  // List of directions and where to move for each
  const orderedDirections = ["N", "E", "S", "W"];
  const diffs = {
    x: { N: 0, E: 1, S: 0, W: -1 },
    y: { N: -1, E: 0, S: 1, W: 0 },
  };

  // Remove bias from directions
  const directions = randomShuffle(orderedDirections);

  // For each direction
  directions.forEach((direction) => {
    // Choose the cell one away in that direction
    const [newX, newY] = [oldX + diffs.x[direction], oldY + diffs.y[direction]];
    // If the cell exists and is empty
    if (between(newY, 0, grid.length) && between(newX, 0, grid.length)) {
      if (sum(grid[newY][newX].status) === 4) {
        // Destroy the walls between the two cells
        const wallToDestroyOld = orderedDirections.indexOf(direction);
        const wallToDestroyNew = (wallToDestroyOld + 2) % 4;
        grid[oldY][oldX].status[wallToDestroyOld] = 0;
        grid[newY][newX].status[wallToDestroyNew] = 0;
        // Repeat for the new cell
        CarveFrom(newX, newY, grid);
      }
    }
  });
}

// Use the recursive function to make a maze array using cell objects
async function Layout(width, height, setPattern) {
  // Start with walls up
  const grid = Array.from({ length: height }, (el, y) =>
    Array.from({ length: width }, (el, x) => ({
      status: [1, 1, 1, 1],
      location: [x, y],
      key: y * width + x,
    }))
  );

  await CarveFrom(0, 0, grid);

  // Make Exit
  grid[height - 1][width - 1].status[1] = 0;

  // Return the finished product
  setPattern(grid);
}

// Make the final grid to display on the site
function Grid({
  size,
  start,
  setStart,
  regen,
  setRegen,
  mazeRef,
  playing,
  setWin,
}) {
  const [pattern, setPattern] = useState([]);
  const [current, setCurrent] = useState([-1, -1]);

  // Keypresses
  const keyPress = useCallback(
    (e) => {
      if (sum(current) === 2 * (size - 1) && e.code === "ArrowRight") {
        // User is done
        console.log("done");
        setWin(true);
      }
      keyDownHandler(
        e,
        current,
        setCurrent,
        pattern[current[1]][current[0]].status,
        playing
      );
    },
    [current, pattern, playing, size, setWin]
  );

  useEffect(() => {
    document.addEventListener("keydown", keyPress, false);

    return () => {
      document.removeEventListener("keydown", keyPress, false);
    };
  }, [keyPress]);

  // Setting up maze (on start, on reset)
  useEffect(() => {
    if (!regen && size === pattern.length) {
      return;
    }

    setPattern(
      Array.from({ length: size }, (el, y) =>
        Array.from({ length: size }, (el, x) => ({
          status: [1, 1, 1, 1],
          location: [x, y],
          key: y * pattern.length + x,
        }))
      )
    );
    setStart(false);
    setWin(false);
    setRegen(false);
    setCurrent(-1, -1);
  }, [regen, size, pattern.length, setStart, setRegen, setWin]);

  // Generate and display maze
  useEffect(() => {
    if (start) {
      console.log("start");
      Layout(size, size, setPattern);
      setCurrent([0, 0]);
    }
  }, [start, size]);

  return (
    <SimpleGrid
      columns={size}
      spacing={0}
      width={pixels(size * boxSize)}
      tabIndex={0}
      outline={0}
      ref={mazeRef}>
      {pattern.map((row, y) => {
        return row.map((props, x) => {
          return (
            <Cell
              status={props.status}
              current={current}
              location={[x, y]}
              key={props.key}
            />
          );
        });
      })}
    </SimpleGrid>
  );
}

export default Grid;
