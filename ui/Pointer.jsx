import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function Pointer() {
  return <View style={styles.pointer} />;
}

const styles = StyleSheet.create({
  pointer: {
    width: 30,
    height: 30,
    backgroundColor: 'red',
  },
});
