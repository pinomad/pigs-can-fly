import React from 'react';
import { StyleSheet, Image } from 'react-native';

import Images from '../assets/images';

export default function TapToStart() {
  return <Image source={Images.tapToStart} style={styles.image} />;
}

const styles = StyleSheet.create({
  image: {
    width: '50%',
    height: 30,
  },
});
