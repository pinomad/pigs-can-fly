import React from 'react';
import { StyleSheet, Image } from 'react-native';

import Images from '../assets/images';

export default function Title() {
  return <Image source={Images.title} style={styles.image} />;
}

const styles = StyleSheet.create({
  image: {
    width: '90%',
    height: 70,
  },
});
