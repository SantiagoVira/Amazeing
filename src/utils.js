import { useRef } from "react";

const boxSize = 30;
const pixels = (numPix) => `${numPix}px`;
const between = (num, min, max) => num >= min && num < max;
const sum = (arr) =>
  arr.reduce((previousValue, currentValue) => previousValue + currentValue, 0);
const randomShuffle = (arr) => {
  const array = [...arr];
  var count = array.length,
    randomnumber,
    temp;
  while (count) {
    randomnumber = (Math.random() * count--) | 0;
    temp = array[count];
    array[count] = array[randomnumber];
    array[randomnumber] = temp;
  }
  return array;
};
const keyDownHandler = (event, current, setCurrent, cell, playing) => {
  if (!playing) {
    return;
  }
  if (event.code === "ArrowUp" && cell[0] === 0) {
    setCurrent([current[0], current[1] - 1]);
  }
  if (event.code === "ArrowRight" && cell[1] === 0) {
    setCurrent([current[0] + 1, current[1]]);
  }
  if (event.code === "ArrowDown" && cell[2] === 0) {
    setCurrent([current[0], current[1] + 1]);
  }
  if (event.code === "ArrowLeft" && cell[3] === 0) {
    setCurrent([current[0] - 1, current[1]]);
  }
};
const useFocus = () => {
  const htmlElRef = useRef(null);
  const setFocus = () => {
    htmlElRef.current && htmlElRef.current.focus();
  };

  return [htmlElRef, setFocus];
};
function timeFormat(num) {
  var s = "000000000" + num;
  return s.substr(s.length - 2);
}

export {
  boxSize,
  pixels,
  between,
  sum,
  randomShuffle,
  keyDownHandler,
  useFocus,
  timeFormat,
};
