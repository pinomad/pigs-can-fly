import React from 'react';
import Matter from 'matter-js';
import { Image } from 'react-native';

function Cloud({ body }) {
  const { x, y } = body.position;
  const width = body.bounds.max.x - body.bounds.min.x;
  const height = body.bounds.max.y - body.bounds.min.y;

  return (
    <Image
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

export default (world, label, color, pos, size) => {
  const initialCloud = Matter.Bodies.rectangle(
    pos.x,
    pos.y,
    size.width,
    size.height,
    { label, isStatic: true },
  );

  Matter.World.add(world, initialCloud);

  return {
    body: initialCloud,
    color,
    pos,
    renderer: <Cloud />,
  };
};
