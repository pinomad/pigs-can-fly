import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { loadAsync } from 'expo-font';

import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';

const font = require('./assets/fonts/30PackGirlBold-jRpv.ttf');
const font2 = require('./assets/fonts/GrislyBeastRegular-0W9rG.ttf');

export default function App() {
  const [isStart, setIsStart] = useState(false);

  async function loadFonts() {
    await loadAsync({
      '30PackGirlBold-jRpv': font,
      'GrislyBeastRegular-0W9rG': font2,
    });
  }

  loadFonts();

  return (
    <View style={styles.container}>
      {isStart ? <GameScreen /> : <StartGameScreen isTouched={setIsStart} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
