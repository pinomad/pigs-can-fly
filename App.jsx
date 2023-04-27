import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { loadAsync } from 'expo-font';

import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';

const font = require('./assets/fonts/30PackGirlBold-jRpv.ttf');

export default function App() {
  const [isStart, setIsStart] = useState(false);

  async function loadFonts() {
    await loadAsync({
      '30PackGirlBold-jRpv': font,
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
