import Matter from 'matter-js';
import { Audio } from 'expo-av';

import { getPipeSizePosPair } from '../utils/random';
import Constants from '../constants';

let tick = 0;
let pose = 1;
const touchSound = require('../assets/sfx/flap.wav');

const Physics = (entities, { touches, time, dispatch }) => {
  const { engine } = entities.physics;
  const soundObject = new Audio.Sound();

  touches
    .filter(t => t.type === 'press')
    .forEach(async () => {
      Matter.Body.setVelocity(entities.Pig.body, { x: 0, y: -9 });

      await playSound();
    });

  Matter.Engine.update(engine, time.delta);

  tick += 1;
  if (tick % 5 === 0) {
    pose += 1;

    if (pose > 14) {
      pose = 1;
    }

    entities.Pig.pose = pose;
  }

  async function playSound() {
    try {
      await soundObject.loadAsync(touchSound);
      await soundObject.playAsync();
    } catch (error) {
      console.log('failed to load the sound', error);
    }
  }

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
      const pipeSizePos = getPipeSizePosPair(Constants.MAX_WIDTH * 1);

      Matter.Body.setPosition(
        entities[`ObstacleTopLid${index}`].body,
        pipeSizePos.pipeTopLid.pos,
      );

      Matter.Body.setPosition(
        entities[`ObstacleBottomLid${index}`].body,
        pipeSizePos.pipeBottomLid.pos,
      );

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

    Matter.Body.translate(entities[`ObstacleTopLid${index}`].body, {
      x: -4,
      y: 0,
    });

    Matter.Body.translate(entities[`ObstacleBottom${index}`].body, {
      x: -4,
      y: 0,
    });

    Matter.Body.translate(entities[`ObstacleBottomLid${index}`].body, {
      x: -4,
      y: 0,
    });

    if (entities.Floor.body.position.x <= (-1 * Constants.MAX_WIDTH) / 2) {
      Matter.Body.setPosition(entities.Floor.body, {
        x: Constants.MAX_WIDTH / 2,
        y: entities.Floor.body.position.y,
      });
    } else {
      Matter.Body.translate(entities.Floor.body, { x: -2, y: 0 });
    }
  }

  Matter.Events.on(engine, 'collisionStart', () => {
    dispatch({ type: 'game_over' });
  });

  return entities;
};

export default Physics;
