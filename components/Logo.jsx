import React from 'react';
import { StyleSheet, Image } from 'react-native';
import logo from '../assets/logo.png';

export default function Logo() {
  return <Image source={logo} style={styles.image} />;
}

const styles = StyleSheet.create({
  image: {
    width: '90%',
    height: 70,
  },
});
