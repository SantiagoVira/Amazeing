import React from "react";
import Grid from "./Grid";
import { Flex, Text, useDisclosure } from "@chakra-ui/react";
import { useState, useEffect, useRef } from "react";
import Sidebar from "./Sidebar";
import { useFocus } from "./utils";
import Timer from "./Timer";
import Confetti from "./Confetti";
import WinPopUp from "./WinPopUp";
import HowToPopUp from "./HowToPopUp";

function App() {
  const [size, setSize] = useState(
    localStorage.getItem("mazeSize") !== null
      ? localStorage.getItem("mazeSize")
      : 12
  );
  const [start, setStart] = useState(false);
  const [regen, setRegen] = useState(false);
  const [counting, setCounting] = useState(false);
  const [restart, setRestart] = useState(0);
  const [startTime, setStartTime] = useState(
    localStorage.getItem("startTime") !== null
      ? localStorage.getItem("startTime")
      : 60
  );
  const [timeLeft, setTimeLeft] = useState(startTime);
  const [timeAfterGame, setTimeAfterGame] = useState(startTime);
  const [playing, setPlaying] = useState(false);
  const [win, setWin] = useState(false);

  const [inputRef, setInputFocus] = useFocus();
  const { isOpen: sidebarIsOpen, onToggle: sidebarOnToggle } = useDisclosure({
    defaultIsOpen:
      localStorage.getItem("sidebarIsOpen") !== null
        ? JSON.parse(localStorage.getItem("sidebarIsOpen"))
        : true,
  });
  const { isOpen: winIsOpen, onToggle: winOnToggle } = useDisclosure();
  const { isOpen: howToIsOpen, onToggle: howToOnToggle } = useDisclosure();

  const howToInitialRef = useRef();
  const howToFinalRef = useRef();

  const onResetMaze = () => {
    const timer = setTimeout(() => {
      setRestart((prev) => prev + 1);
    }, 150);
    setRegen(true);
    setCounting(false);
    return () => clearTimeout(timer);
  };

  useEffect(() => {
    localStorage.setItem("sidebarIsOpen", JSON.stringify(sidebarIsOpen));
  }, [sidebarIsOpen]);

  useEffect(() => {
    localStorage.setItem("mazeSize", size);
  }, [size]);

  useEffect(() => {
    localStorage.setItem("startTime", startTime);
  }, [startTime]);

  useEffect(() => {
    setPlaying(start && !sidebarIsOpen && timeLeft > 0 && !win);
    if (!winIsOpen && (timeLeft === 0 || win)) {
      console.log(`${!winIsOpen} and (${timeLeft === 0} or ${win})`);
      setTimeAfterGame(timeLeft);
      winOnToggle();
      onResetMaze();
    }
  }, [start, sidebarIsOpen, timeLeft, win, winIsOpen, winOnToggle]);

  return (
    <Flex flexDirection="column" width="100vw" alignItems="center">
      <Confetti win={win} />
      <Timer
        counting={counting}
        restart={restart}
        setTimeLeft={setTimeLeft}
        playing={playing}
        timeLeft={timeLeft}
        startTime={startTime}
      />
      <Sidebar
        setRegen={setRegen}
        size={size}
        setSize={setSize}
        setStart={setStart}
        setInputFocus={setInputFocus}
        setCounting={setCounting}
        restartTimer={() => setRestart((prev) => prev + 1)}
        isOpen={sidebarIsOpen}
        onToggle={sidebarOnToggle}
        timeLeft={timeLeft}
        onResetMaze={onResetMaze}
        howToOnToggle={howToOnToggle}
        gray={win}
        start={start}
        canChangeStart={!start}
        startTime={startTime}
        setStartTime={setStartTime}
        howToFinalRef={howToFinalRef}
      />
      <Grid
        size={size}
        start={start}
        setStart={setStart}
        regen={regen}
        setRegen={setRegen}
        inputRef={inputRef}
        playing={playing}
        setWin={setWin}
      />
      <HowToPopUp
        initialRef={howToInitialRef}
        finalRef={howToFinalRef}
        isOpen={howToIsOpen}
        onToggle={howToOnToggle}
      />
      <WinPopUp
        isOpen={winIsOpen}
        onToggle={winOnToggle}
        onResetMaze={onResetMaze}>
        {timeAfterGame > 0 ? (
          <Text textAlign="center" fontWeight="bold" fontSize="2.5rem">
            Congratulations!
            <br /> You won with{" "}
            <Text
              as="span"
              color={
                timeAfterGame >= 45
                  ? "#64eb34"
                  : timeAfterGame > 10
                  ? "white"
                  : "tomato"
              }>
              {timeAfterGame}
            </Text>{" "}
            seconds remaining!
          </Text>
        ) : (
          <Text textAlign="center" fontWeight="bold" fontSize="2.5rem">
            Oh no! You didn't make it! Better luck next time!
          </Text>
        )}
      </WinPopUp>
    </Flex>
  );
}

export default App;
