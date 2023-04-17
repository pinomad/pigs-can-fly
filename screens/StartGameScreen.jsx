import React from 'react';
import { StyleSheet, View, Pressable } from 'react-native';

import Pig from '../ui/Pig';
import Pointer from '../ui/Pointer';
import Logo from '../components/Logo';
import TapToStart from '../components/TapToStart';

export default function StartGameScreen({ isTouched }) {
  const handleTouch = () => {
    console.log('터치함');
    isTouched(true);
  };

  return (
    <Pressable onPress={handleTouch} style={styles.container}>
      <View style={styles.top}>
        <Logo />
      </View>
      <View style={styles.bottom}>
        <View style={styles.character}>
          <Pig />
          <Pointer />
          <TapToStart />
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ccc',
  },
  top: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottom: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'top',
  },
  character: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
});
