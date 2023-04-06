import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { Audio } from 'expo-av';

import Pig from '../ui/Pig';

export default function GameScreen() {
  const [flapSound, setFlapSound] = useState();

  const playSound = async () => {
    const { sound } = await Audio.Sound.createAsync( require('../assets/sfx/flap.wav')
    );
    setFlapSound(sound);

    await sound.playAsync();
  };

  // useEffect(() => {
  //   return sound
  //   ? () => {
  //       console.log('Unloading Sound');
  //       sound.unloadAsync();
  //     }
  //   : undefined;
  // }, [sound]);

  return (
    <Pressable style={styles.container} onPress={playSound}>
      <View style={styles.text}>
        <Pig />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
