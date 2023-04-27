import Matter from 'matter-js';

import Pig from '../components/Pig';
import Floor from '../components/Floor';
import Obstacle from '../components/Obstacle';
import ObstacleLid from '../components/ObstacleLid';
import { getPipeSizePosPair } from '../utils/random';
import Constants from '../constants';

export default () => {
  const engine = Matter.Engine.create({ enableSleeping: false });
  const { world } = engine;
  world.gravity.y = 1.4;
  // engine.gravity.y = 0.4;

  const pipeSizePosA = getPipeSizePosPair();
  const pipeSizePosB = getPipeSizePosPair(Constants.MAX_WIDTH * 1.1);

  return {
    physics: { engine, world },
    Pig: Pig(world, { x: 50, y: 300 }, { width: 60, height: 60 }),
    ObstacleTopLid1: ObstacleLid(
      world,
      'ObstacleTopLid1',
      pipeSizePosA.pipeTopLid.pos,
      pipeSizePosA.pipeTopLid.size,
    ),
    ObstacleBottomLid1: ObstacleLid(
      world,
      'ObstacleBottomLid1',
      pipeSizePosA.pipeBottomLid.pos,
      pipeSizePosA.pipeBottomLid.size,
    ),
    ObstacleTopLid2: ObstacleLid(
      world,
      'ObstacleTopLid2',
      pipeSizePosB.pipeTopLid.pos,
      pipeSizePosB.pipeTopLid.size,
    ),
    ObstacleBottomLid2: ObstacleLid(
      world,
      'ObstacleBottomLid2',
      pipeSizePosB.pipeBottomLid.pos,
      pipeSizePosB.pipeBottomLid.size,
    ),
    ObstacleTop1: Obstacle(
      world,
      'ObstacleTop1',
      pipeSizePosA.pipeTop.pos,
      pipeSizePosA.pipeTop.size,
    ),
    ObstacleBottom1: Obstacle(
      world,
      'ObstacleBottom1',
      pipeSizePosA.pipeBottom.pos,
      pipeSizePosA.pipeBottom.size,
    ),
    ObstacleTop2: Obstacle(
      world,
      'ObstacleTop2',
      pipeSizePosB.pipeTop.pos,
      pipeSizePosB.pipeTop.size,
    ),
    ObstacleBottom2: Obstacle(
      world,
      'ObstacleBottom2',
      pipeSizePosB.pipeBottom.pos,
      pipeSizePosB.pipeBottom.size,
    ),
    Floor: Floor(
      world,
      { x: Constants.MAX_WIDTH / 2, y: Constants.MAX_HEIGHT },
      { width: Constants.MAX_WIDTH, height: 80 },
    ),
  };
};
