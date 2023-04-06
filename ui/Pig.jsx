import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function Pig() {
  return <View style={styles.pig} />;
}

const styles = StyleSheet.create({
  pig: {
    width: 30,
    height: 30,
    backgroundColor: 'pink',
  },
});
