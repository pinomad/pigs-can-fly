import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { GameEngine } from 'react-native-game-engine';

import entities from '../entities';
import Physics from '../physics';

export default function GameScreen() {
  const [running, setRunning] = useState(true);
  const [gameEngine, setGameEngine] = useState(null);
  const [currentPoints, setCurrentPoints] = useState(0);

  const handleRestart = () => {
    setCurrentPoints(0);
    setRunning(true);
    gameEngine.swap(entities());
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
        {currentPoints}
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
              setRunning(false);
              gameEngine.stop();
              setCurrentPoints(0);

              break;
            case 'new_point':
              setCurrentPoints(currentPoints + 1);

              break;
            default:
              console.log('해당 타입이 없습니다.');
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
          </Pressable>
        </View>
      ) : null}
    </View>
  );
}
