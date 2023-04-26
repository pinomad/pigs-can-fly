import React from 'react';
import Matter from 'matter-js';
import { View, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Images from '../assets/images';

function Obstacle({ body }) {
  const { x, y } = body.position;
  const width = body.bounds.max.x - body.bounds.min.x;
  const height = body.bounds.max.y - body.bounds.min.y;
  // console.log(body);
  // const pipeRatio = 160 / width;
  // const pipeHeight = 33 * pipeRatio;
  // const pipeIterations = Math.ceil(height / pipeHeight);

  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      colors={[
        '#486600',
        '#86d504',
        '#c6f808',
        '#86d504',
        '#66c302',
        '#486600',
      ]}
      style={{
        position: 'absolute',
        left: x - width / 2,
        top: y - height / 2,
        width,
        height,
      }}
    />
  );
}

export default (world, label, pos, size) => {
  const initialObstacle = Matter.Bodies.rectangle(
    pos.x,
    pos.y,
    size.width,
    size.height,
    { label, isStatic: true },
  );

  Matter.World.add(world, initialObstacle);

  return {
    body: initialObstacle,
    pos,
    renderer: <Obstacle />,
  };
};
