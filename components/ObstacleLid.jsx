import React from 'react';
import Matter from 'matter-js';
import { LinearGradient } from 'expo-linear-gradient';

function ObstacleLid({ body }) {
  const { x, y } = body.position;
  const width = body.bounds.max.x - body.bounds.min.x;
  const height = body.bounds.max.y - body.bounds.min.y;

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
        borderWidth: 3,
        borderRadius: 5,
        borderColor: '#486600',
        position: 'absolute',
        left: x - width / 2,
        top: y - height / 2,
        width,
        height,
        zIndex: 1,
      }}
    />
  );
}

export default (world, label, pos, size) => {
  const initialObstacleLid = Matter.Bodies.rectangle(
    pos.x,
    pos.y,
    size.width,
    size.height,
    { label, isStatic: true },
  );

  Matter.World.add(world, initialObstacleLid);

  return {
    body: initialObstacleLid,
    pos,
    renderer: <ObstacleLid />,
  };
};
