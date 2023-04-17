import Matter from 'matter-js';
import { Dimensions } from 'react-native';
import Pig from '../components/Pig';
import Floor from '../components/Floor';
import Obstacle from '../components/Obstacle';
import { getPipeSizePosPair } from '../utils/random';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default () => {
  const engine = Matter.Engine.create({ enableSleeping: false });
  const { world } = engine;
  world.gravity.y = 1;
  // engine.gravity.y = 0.4;

  const pipeSizePosA = getPipeSizePosPair();
  const pipeSizePosB = getPipeSizePosPair(windowWidth * 1.1);

  return {
    physics: { engine, world },
    Pig: Pig(world, 'red', { x: 50, y: 300 }, { width: 30, height: 30 }),
    ObstacleTop1: Obstacle(
      world,
      'ObstacleTop1',
      'blue',
      pipeSizePosA.pipeTop.pos,
      pipeSizePosA.pipeTop.size,
    ),
    ObstacleBottom1: Obstacle(
      world,
      'ObstacleBottom1',
      'blue',
      pipeSizePosA.pipeBottom.pos,
      pipeSizePosA.pipeBottom.size,
    ),
    ObstacleTop2: Obstacle(
      world,
      'ObstacleTop2',
      'blue',
      pipeSizePosB.pipeTop.pos,
      pipeSizePosB.pipeTop.size,
    ),
    ObstacleBottom2: Obstacle(
      world,
      'ObstacleBottom2',
      'blue',
      pipeSizePosB.pipeBottom.pos,
      pipeSizePosB.pipeBottom.size,
    ),
    Floor: Floor(
      world,
      'green',
      { x: windowWidth / 2, y: windowHeight },
      { width: windowWidth, height: 80 },
    ),
  };
};
