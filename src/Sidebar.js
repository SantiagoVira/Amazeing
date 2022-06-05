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
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
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

function HandleOnClosed({ isOpen, onToggle, children }) {
  return (
    <>
      {children}
      <Fade in={!isOpen}>
        <Flex
          position="absolute"
          top={0}
          left={0}
          zIndex={10}
          width="fit-content"
          p="0.2rem"
          height="100vh"
          borderRight="1px solid white"
          bg="gray.800">
          <OpenButton onToggle={onToggle} />
        </Flex>
      </Fade>
    </>
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
        width="90%"
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
  setMazeFocus,
  mazeRef,
  isOpen,
  onToggle,
  timeLeft,
  onResetMaze,
  howToOnToggle,
  start,
  canChangeStart,
  startTime,
  setStartTime,
  howToFinalRef,
}) {
  return (
    <HandleOnClosed isOpen={isOpen} onToggle={onToggle}>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onToggle}
        finalFocusRef={mazeRef}
        size="sm">
        <DrawerOverlay />
        <DrawerContent borderRight="1px solid white" bg="gray.800">
          <DrawerHeader>Menu</DrawerHeader>

          <DrawerBody>
            <Flex flexDirection="column" justifyContent="space-between">
              <Flex flexDirection="column" alignItems="center">
                <ThreeStopSlider
                  title="Maze Size"
                  stops={[4, 12, 20]}
                  onChange={setSize}
                  def={size}
                />
                <ThreeStopSlider
                  title="Start Time"
                  stops={[20, 60, 100]}
                  onChange={setStartTime}
                  disabled={!canChangeStart}
                  def={startTime}
                />
              </Flex>
              <Flex flexDirection="column">
                <Button
                  colorScheme="red"
                  variant="outline"
                  mt="2vh"
                  onClick={howToOnToggle}>
                  How To
                </Button>
                <Button
                  colorScheme="red"
                  variant="outline"
                  mt="2vh"
                  onClick={onResetMaze}>
                  Re-Generate
                </Button>
                <Button
                  colorScheme="red"
                  variant="solid"
                  color="gray.800"
                  mt="6vh"
                  onClick={() => {
                    setStart(true);
                    onToggle();
                    setMazeFocus();
                    setCounting(true);
                  }}
                  ref={howToFinalRef}>
                  {timeLeft >= startTime || timeLeft === 0 ? "Start" : "Resume"}
                </Button>
              </Flex>
              <OpenButton onToggle={onToggle} right={true} />
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </HandleOnClosed>
  );
}

export default Sidebar;
