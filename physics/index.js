import Matter from 'matter-js';
import { Dimensions } from 'react-native';
import { getPipeSizePosPair } from '../utils/random';

const windowWidth = Dimensions.get('window').width;

const Physics = (entities, { touches, time, dispatch }) => {
  const { engine } = entities.physics;

  touches
    .filter(t => t.type === 'press')
    .forEach(() => {
      Matter.Body.setVelocity(entities.Pig.body, { x: 0, y: -8 });
    });

  Matter.Engine.update(engine, time.delta);

  for (let index = 1; index <= 2; index += 1) {
    if (
      entities[`ObstacleTop${index}`].body.bounds.max.x <= 50 &&
      !entities[`ObstacleTop${index}`].point
    ) {
      entities[`ObstacleTop${index}`].point = true;

      dispatch({ type: 'new_score' });
    }

    if (entities[`ObstacleTop${index}`].body.bounds.max.x <= 0) {
      entities[`ObstacleTop${index}`].point = false;
      const pipeSizePos = getPipeSizePosPair(windowWidth * 1.1);

      Matter.Body.setPosition(
        entities[`ObstacleTop${index}`].body,
        pipeSizePos.pipeTop.pos,
      );
      Matter.Body.setPosition(
        entities[`ObstacleBottom${index}`].body,
        pipeSizePos.pipeBottom.pos,
      );
    }

    Matter.Body.translate(entities[`ObstacleTop${index}`].body, {
      x: -4,
      y: 0,
    });
    Matter.Body.translate(entities[`ObstacleBottom${index}`].body, {
      x: -4,
      y: 0,
    });
  }

  Matter.Events.on(engine, 'collisionStart', () => {
    dispatch({ type: 'game_over' });
  });

  return entities;
};

export default Physics;
