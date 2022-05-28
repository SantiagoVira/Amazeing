import React from "react";
import "@fontsource/dseg7";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { timeFormat } from "./utils";
import { Box, Text } from "@chakra-ui/react";

const getReturnValues = (countDown) => {
  // calculate time left
  const minutes = Math.floor(countDown / 60);
  const seconds = Math.floor(countDown % 60);
  return `${minutes}:${timeFormat(seconds)}`;
};

function Timer({
  counting,
  restart,
  setTimeLeft,
  playing,
  timeLeft,
  startTime,
}) {
  return (
    <Box my="4vh">
      <CountdownCircleTimer
        isPlaying={counting && playing}
        duration={startTime}
        colors={["#64eb34", "#c1fc35", "#f6fa00", "#e02914", "#e02914"]}
        colorsTime={[45, 30, 15, 10, 0]}
        trailColor={timeLeft > 0 ? "#d9d9d9" : "tomato"}
        size={100}
        onUpdate={setTimeLeft}
        key={restart}>
        {({ remainingTime }) => (
          <Text fontFamily="DSEG7" color={timeLeft > 10 ? "white" : "tomato"}>
            {getReturnValues(remainingTime)}
          </Text>
        )}
      </CountdownCircleTimer>
    </Box>
  );
}

export default Timer;
