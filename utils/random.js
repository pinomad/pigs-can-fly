import Constants from '../constants';

export const getRandom = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const getPipeSizePosPair = (addToPosX = 0) => {
  const yPosTop = -getRandom(300, Constants.MAX_HEIGHT - 100);

  const pipeTop = {
    pos: { x: Constants.MAX_WIDTH + addToPosX + 100, y: yPosTop },
    size: { height: Constants.MAX_HEIGHT * 2, width: 75 },
  };

  const pipeTopLid = {
    pos: {
      x: Constants.MAX_WIDTH + addToPosX + 100,
      y: yPosTop + Constants.MAX_HEIGHT,
    },
    size: { height: 50, width: 90 },
  };

  const pipeBottom = {
    pos: {
      x: Constants.MAX_WIDTH + addToPosX + 100,
      y: Constants.MAX_HEIGHT * 2 + 220 + yPosTop,
    },
    size: { height: Constants.MAX_HEIGHT * 2, width: 75 },
  };

  const pipeBottomLid = {
    pos: {
      x: Constants.MAX_WIDTH + addToPosX + 100,
      y: yPosTop + Constants.MAX_HEIGHT + 220,
    },
    size: { height: 50, width: 90 },
  };

  return { pipeTop, pipeBottom, pipeTopLid, pipeBottomLid };
};
