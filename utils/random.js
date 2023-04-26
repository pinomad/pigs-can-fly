import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const getRandom = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const getPipeSizePosPair = (addToPosX = 0) => {
  const yPosTop = -getRandom(300, windowHeight - 100);

  const pipeTop = {
    pos: { x: windowWidth + addToPosX + 100, y: yPosTop },
    size: { height: windowHeight * 2, width: 75 },
  };

  const pipeTopLid = {
    pos: { x: windowWidth + addToPosX + 100, y: yPosTop + windowHeight },
    size: { height: 50, width: 90 },
  };

  const pipeBottom = {
    pos: {
      x: windowWidth + addToPosX + 100,
      y: windowHeight * 2 + 220 + yPosTop,
    },
    size: { height: windowHeight * 2, width: 75 },
  };

  const pipeBottomLid = {
    pos: { x: windowWidth + addToPosX + 100, y: yPosTop + windowHeight + 220 },
    size: { height: 50, width: 90 },
  };

  return { pipeTop, pipeBottom, pipeTopLid, pipeBottomLid };
};
