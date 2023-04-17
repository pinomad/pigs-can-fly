import React from 'react';
import Matter from 'matter-js';
import { View } from 'react-native';

function Pig({ body, color }) {
  const widthBody = body.bounds.max.x - body.bounds.min.x;
  const heightBody = body.bounds.max.y - body.bounds.min.y;

  const xBody = body.position.x - widthBody / 2;
  const yBody = body.position.y - heightBody / 2;

  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: color,
        borderStyle: 'solid',
        position: 'absolute',
        left: xBody,
        top: yBody,
        width: widthBody,
        height: heightBody,
      }}
    />
  );
}

export default (world, color, pos, size) => {
  const initialPig = Matter.Bodies.rectangle(
    pos.x,
    pos.y,
    size.width,
    size.height,
    { label: 'Pig' },
  );

  Matter.World.add(world, initialPig);

  return {
    body: initialPig,
    color,
    pos,
    renderer: <Pig />,
  };
};
