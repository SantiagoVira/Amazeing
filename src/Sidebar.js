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
  Text,
} from "@chakra-ui/react";
import { GiHamburgerMenu } from "react-icons/gi";
import React from "react";
import { useEffect } from "react";

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

function ThreeStopSlider({ title, stops, onChange, def, disabled }) {
  return (
    <>
      <Text fontWeight={"bold"} textAlign={"center"} mb={4}>
        {title}
      </Text>

      <Slider
        min={stops[0]}
        defaultValue={def ? def : stops[1]}
        max={stops[2]}
        step={1}
        width="20vw"
        mb="50px"
        onChange={onChange}
        isDisabled={disabled}>
        <SliderMark value={stops[0]} fontSize="sm" mt={2} ml="-2.5">
          {stops[0]}
        </SliderMark>
        <SliderMark value={stops[1]} fontSize="sm" mt={2} ml="-2.5">
          {stops[1]}
        </SliderMark>
        <SliderMark value={stops[2]} fontSize="sm" mt={2} ml="-2.5">
          {stops[2]}
        </SliderMark>
        <SliderTrack bg="red.100">
          <SliderFilledTrack bg="tomato" />
        </SliderTrack>
        <SliderThumb boxSize={3} outline={0} />
      </Slider>
    </>
  );
}

function Sidebar({
  size,
  setSize,
  setStart,
  setCounting,
  setInputFocus,
  isOpen,
  onToggle,
  timeLeft,
  onResetMaze,
  gray,
  start,
  canChangeStart,
  startTime,
  setStartTime,
}) {
  useEffect(() => {
    console.log(gray);
  }, [gray]);
  return (
    <>
      <Box
        bg="blackAlpha.700"
        position={"absolute"}
        top={0}
        left={0}
        w="100vw"
        h="100vh"
        display={isOpen || gray ? "flex" : "none"}
      />
      <Slide in={isOpen} direction="left">
        <Flex
          w={"25vw"}
          h={"100vh"}
          padding={"2.5vw"}
          paddingTop={"5vw"}
          borderRight={"1px solid white"}
          flexDirection="column"
          justifyContent="space-between"
          position="absolute"
          top={0}
          left={0}
          bg={"gray.800"}>
          <Box>
            <ThreeStopSlider
              title={"Maze Size"}
              stops={[4, 12, 20]}
              onChange={setSize}
              def={size}
            />
            <ThreeStopSlider
              title={"Start Time"}
              stops={[20, 60, 100]}
              onChange={setStartTime}
              disabled={!canChangeStart}
            />
          </Box>
          <Flex flexDirection="column">
            <Button
              colorScheme="red"
              variant="outline"
              mt="5vh"
              onClick={onResetMaze}>
              Re-Generate
            </Button>

            <Button
              colorScheme="red"
              variant="solid"
              color="gray.800"
              mt="5vh"
              onClick={() => {
                setStart(true);
                onToggle();
                setInputFocus();
                setCounting(true);
              }}>
              {timeLeft >= startTime || timeLeft === 0 ? "Start" : "Resume"}
            </Button>
          </Flex>
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
