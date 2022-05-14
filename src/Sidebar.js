import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Flex,
  SliderMark,
  Button,
  IconButton,
  Slide,
  Fade,
  Box,
} from "@chakra-ui/react";
import { GiHamburgerMenu } from "react-icons/gi";
import React from "react";

function OpenButton({ onToggle, right }) {
  return (
    <IconButton
      variant="ghost"
      colorScheme="red"
      aria-label="Toggle Sidebar"
      icon={<GiHamburgerMenu />}
      onClick={onToggle}
      position={right && "absolute"}
      right={right && "5px"}
      top={"5px"}
    />
  );
}

function Sidebar({
  setSize,
  setStart,
  setRegen,
  setCounting,
  setInputFocus,
  restartTimer,
  isOpen,
  onToggle,
  timeLeft,
}) {
  return (
    <>
      <Box
        bg="blackAlpha.700"
        position={"absolute"}
        top={0}
        left={0}
        w="100vw"
        h="100vh"
        display={isOpen ? "flex" : "none"}
      />
      <Slide in={isOpen} direction="left">
        <Flex
          w={"25vw"}
          h={"100vh"}
          padding={"2.5vw"}
          paddingTop={"5vw"}
          borderRight={"1px solid white"}
          flexDirection="column"
          position="absolute"
          top={0}
          left={0}
          bg={"gray.800"}>
          <Slider
            defaultValue={12}
            min={4}
            max={20}
            step={1}
            width="20vw"
            onChange={(v) => setSize(v)}>
            <SliderMark value={4} fontSize="sm" mt={2} ml="-2.5">
              4
            </SliderMark>
            <SliderMark value={12} fontSize="sm" mt={2} ml="-2.5">
              12
            </SliderMark>
            <SliderMark value={20} fontSize="sm" mt={2} ml="-2.5">
              20
            </SliderMark>
            <SliderTrack bg="red.100">
              <SliderFilledTrack bg="tomato" />
            </SliderTrack>
            <SliderThumb boxSize={3} outline={0} />
          </Slider>
          <Button
            colorScheme="red"
            variant="outline"
            mt="5vh"
            onClick={() => {
              setRegen(true);
              restartTimer();
              setCounting(false);
            }}>
            Re-Generate
          </Button>
          <Button
            colorScheme="red"
            variant="outline"
            mt="5vh"
            onClick={() => {
              setStart(true);
              onToggle();
              setInputFocus();
              setCounting(true);
            }}>
            {timeLeft >= 60 || timeLeft === 0 ? "Start" : "Resume"}
          </Button>
          <OpenButton onToggle={onToggle} right={true} />
        </Flex>
      </Slide>
      <Fade in={!isOpen}>
        <Flex
          position="absolute"
          top={0}
          left={0}
          zIndex={10}
          width="fit-content"
          height="100vh"
          borderRight="1px solid white"
          bg="gray.800">
          <OpenButton onToggle={onToggle} />
        </Flex>
      </Fade>
    </>
  );
}

export default Sidebar;
