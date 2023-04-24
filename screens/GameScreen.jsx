import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { GameEngine } from 'react-native-game-engine';

import entities from '../entities';
import Physics from '../physics';

export default function GameScreen() {
  const [running, setRunning] = useState(true);
  const [gameEngine, setGameEngine] = useState(null);
  const [score, setScore] = useState(0);

  const handleRestart = () => {
    setScore(0);
    setRunning(true);
    gameEngine.swap(entities());
  };

  const gameOver = () => {
    setRunning(false);
    gameEngine.stop();
  };

  return (
    <View style={{ flex: 1 }}>
      <Text
        style={{
          paddingTop: 50,
          textAlign: 'center',
          fontSize: 40,
          fontWeight: '500',
        }}
      >
        {score}
      </Text>
      <GameEngine
        ref={ref => {
          setGameEngine(ref);
        }}
        systems={[Physics]}
        entities={entities()}
        running={running}
        onEvent={e => {
          switch (e.type) {
            case 'game_over':
              gameOver();

              break;
            case 'new_score':
              setScore(score + 1);

              break;
            default:
          }
        }}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
      />
      {!running ? (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <Pressable
            style={{
              backgroundColor: 'black',
              paddingHorizontal: 30,
              paddingVertical: 30,
            }}
            onPress={handleRestart}
          >
            <Text style={{ fontWeight: '300', color: 'white', fontSize: 30 }}>
              RESTART
            </Text>
            <Text style={{ fontWeight: '300', color: 'white', fontSize: 30 }}>
              SCORE : {score}
            </Text>
          </Pressable>
        </View>
      ) : null}
    </View>
  );
}
