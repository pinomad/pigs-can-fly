import React, { useEffect, useState } from 'react';
import Matter from 'matter-js';
import { Animated } from 'react-native';
import Images from '../assets/images';

function Pig({ body, pose }) {
  const [animatedValue] = useState(new Animated.Value(body.velocity.y));

  useEffect(() => {
    animatedValue.setValue(body.velocity.y);
  }, [body.velocity.y]);

  const { x, y } = body.position;
  const width = body.bounds.max.x - body.bounds.min.x;
  const height = body.bounds.max.y - body.bounds.min.y;

  const image = Images[`pig${pose}`];

  const rotation = animatedValue.interpolate({
    inputRange: [-10, 0, 10, 20],
    outputRange: ['-20deg', '0deg', '15deg', '45deg'],
    extrapolate: 'clamp',
  });

  return (
    <Animated.Image
      style={{
        position: 'absolute',
        left: x - width / 2,
        top: y - height / 2,
        width,
        height,
        transform: [{ rotate: rotation }],
      }}
      source={image}
      resizeMode="stretch"
    />
  );
}

const createPig = (world, pos, size) => {
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
    pos,
    renderer: <Pig />,
  };
};

export default createPig;
