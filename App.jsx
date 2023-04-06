import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';

export default function App() {
  const [isStart, setIsStart] = useState(false);

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
