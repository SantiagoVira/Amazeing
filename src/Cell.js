import React from "react";
import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";

function Cell({ status, current, location, size, mazeDimensions }) {
  const [bg, setBg] = useState(
    current[0] === location[0] && current[1] === location[1]
      ? "tomato"
      : "transparent"
  );

  useEffect(() => {
    setBg(
      current[0] === location[0] && current[1] === location[1]
        ? "tomato"
        : "transparent"
    );
  }, [current, location]);

  return (
    <Box
      width={`calc(${mazeDimensions} / ${size})`}
      height={`calc(${mazeDimensions} / ${size})`}
      border={"1px solid white"}
      borderTop={status[0] > 0 ? "1px" : "0px"}
      borderRight={status[1] > 0 ? "1px" : "0px"}
      borderBottom={status[2] > 0 ? "1px" : "0px"}
      borderLeft={status[3] > 0 ? "1px" : "0px"}
      padding="5px">
      <Box backgroundColor={bg} width="100%" height="100%" />
    </Box>
  );
}

export default Cell;
