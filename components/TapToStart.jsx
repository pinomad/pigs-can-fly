import React from 'react';
import { StyleSheet, Image } from 'react-native';
import tapToStart from '../assets/tap-to-start.png';

export default function TapToStart() {
  return <Image source={tapToStart} style={styles.image} />;
}

const styles = StyleSheet.create({
  image: {
    width: '50%',
    height: 50,
  },
});
