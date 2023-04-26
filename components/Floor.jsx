import React from 'react';
import Matter from 'matter-js';
import { View, Image } from 'react-native';
import Images from '../assets/images';

function Floor({ body }) {
  const { x, y } = body.position;
  const width = body.bounds.max.x - body.bounds.min.x;
  const height = body.bounds.max.y - body.bounds.min.y;

  const imageIterations = Math.ceil(width / height);

  return (
    <View
      style={{
        position: 'absolute',
        left: x - width / 2,
        top: y - height / 2,
        width: width * 2,
        height,
        overflow: 'hidden',
        flexDirection: 'row',
      }}
    >
      {[...Array(imageIterations * 2)].map((el, idx) => {
        return (
          <Image
            style={{ width: height, height }}
            key={idx}
            resizeMode="stretch"
            source={Images.floor}
          />
        );
      })}
    </View>
  );
}

const createFloor = (world, pos, size) => {
  const initialFloor = Matter.Bodies.rectangle(
    pos.x,
    pos.y,
    size.width,
    size.height,
    { label: 'Floor', isStatic: true },
  );

  Matter.World.add(world, initialFloor);

  return {
    body: initialFloor,
    renderer: <Floor />,
  };
};

export default createFloor;
