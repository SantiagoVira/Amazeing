import React from "react";
import Grid from "./Grid";
import { Flex, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import Sidebar from "./Sidebar";
import { useFocus } from "./utils";
import Timer from "./Timer";
import { useEffect } from "react";
import Confetti from "./Confetti";

function App() {
  const [size, setSize] = useState(12);
  const [start, setStart] = useState(false);
  const [regen, setRegen] = useState(false);
  const [counting, setCounting] = useState(false);
  const [restart, setRestart] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [playing, setPlaying] = useState(false);
  const [win, setWin] = useState(false);

  const [inputRef, setInputFocus] = useFocus();
  const { isOpen, onToggle } = useDisclosure({
    defaultIsOpen: localStorage.getItem("isOpen")
      ? JSON.parse(localStorage.getItem("isOpen"))
      : true,
  });

  useEffect(() => {
    localStorage.setItem("isOpen", JSON.stringify(isOpen));
  }, [isOpen]);

  useEffect(() => {
    setPlaying(start && !isOpen && timeLeft > 0 && !win);
  }, [start, isOpen, timeLeft, win]);

  return (
    <Flex flexDirection="column" width="100vw" alignItems="center">
      <Confetti win={win} />
      <Timer
        counting={counting}
        restart={restart}
        setTimeLeft={setTimeLeft}
        playing={playing}
        timeLeft={timeLeft}
      />
      <Sidebar
        setRegen={setRegen}
        setSize={setSize}
        setStart={setStart}
        setInputFocus={setInputFocus}
        setCounting={setCounting}
        restartTimer={() => setRestart((prev) => prev + 1)}
        isOpen={isOpen}
        onToggle={onToggle}
        timeLeft={timeLeft}
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
    </Flex>
  );
}

export default App;

/*
Sidebar
- Take up full screen on small
- On resize of one after win maze still functions
- on oversize using arrow keys scrolls around

Movement
- winning pop upd
- adjustable start time
- random teleportation button?

How to
*/
