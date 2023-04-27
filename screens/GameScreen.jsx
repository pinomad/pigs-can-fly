import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  Pressable,
  Image,
  Animated,
  StyleSheet,
} from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import Images from '../assets/images';
import Constants from '../constants';

import entities from '../entities';
import Physics from '../physics';

export default function GameScreen() {
  const [running, setRunning] = useState(true);
  const [gameEngine, setGameEngine] = useState(null);
  const [score, setScore] = useState(0);
  const cloudX1 = useRef(new Animated.Value(0)).current;
  const cloudX2 = useRef(new Animated.Value(0)).current;
  const cloudX3 = useRef(new Animated.Value(0)).current;
  const cloudX4 = useRef(new Animated.Value(0)).current;

  const handleRestart = () => {
    setScore(0);
    setRunning(true);
    gameEngine.swap(entities());
  };

  const gameOver = () => {
    setRunning(false);
    gameEngine.stop();
  };

  const cloudMoving1 = Animated.timing(cloudX1, {
    toValue: -Constants.MAX_WIDTH - 100,
    duration: 8500,
    useNativeDriver: true,
    delay: 0,
    isInteraction: true,
  });

  const cloudMoving2 = Animated.timing(cloudX2, {
    toValue: -Constants.MAX_WIDTH - 100,
    duration: 13000,
    useNativeDriver: true,
    delay: 3000,
    isInteraction: true,
  });

  const cloudMoving3 = Animated.timing(cloudX3, {
    toValue: -Constants.MAX_WIDTH - 100,
    duration: 10000,
    useNativeDriver: true,
    delay: 2000,
    isInteraction: true,
  });

  const cloudMoving4 = Animated.timing(cloudX4, {
    toValue: -Constants.MAX_WIDTH - 100,
    duration: 5000,
    useNativeDriver: true,
    delay: 1500,
    isInteraction: true,
  });

  useEffect(() => {
    Animated.loop(cloudMoving1).start();
    Animated.loop(cloudMoving2).start();
    Animated.loop(cloudMoving3).start();
    Animated.loop(cloudMoving4).start();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Animated.Image
        source={Images.cloud1}
        style={[styles.cloud1(cloudX1)]}
        resizeMode="cover"
      />
      <Animated.Image
        source={Images.cloud2}
        style={[styles.cloud2(cloudX2)]}
        resizeMode="cover"
      />
      <Animated.Image
        source={Images.cloud3}
        style={[styles.cloud3(cloudX3)]}
        resizeMode="cover"
      />
      <Animated.Image
        source={Images.cloud4}
        style={[styles.cloud4(cloudX4)]}
        resizeMode="cover"
      />
      <Image
        source={Images.background1}
        style={styles.bg1}
        resizeMode="stretch"
      />
      <Image
        source={Images.background2}
        style={styles.bg2}
        resizeMode="cover"
      />
      <Image
        source={Images.background3}
        style={styles.bg3}
        resizeMode="cover"
      />
      <Image
        source={Images.background4}
        style={styles.bg4}
        resizeMode="cover"
      />
      <Text style={styles.score}>{running && score}</Text>
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
        style={styles.gameEngine}
      />
      {!running && (
        <Pressable style={styles.gameOverContainer} onPress={handleRestart}>
          <View
            style={{
              flex: 1,
              paddingTop: 200,
            }}
          >
            <Text style={styles.gameOver}>GAME OVER</Text>
          </View>
          <View
            style={{
              flex: 1,
            }}
          >
            <Text style={styles.finalScore}>SCORE : {score}</Text>
          </View>
          <View
            style={{
              flex: 1,
            }}
          >
            <Text style={styles.tapToReStart}>TAP TO RESTART</Text>
          </View>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  tapToReStart: {
    fontWeight: '300',
    color: 'red',
    fontSize: 30,
    fontFamily: '30PackGirlBold-jRpv',
  },
  finalScore: {
    fontWeight: '600',
    color: 'white',
    fontSize: 40,
    fontFamily: '30PackGirlBold-jRpv',
  },
  gameOver: {
    fontWeight: '600',
    color: 'white',
    fontSize: 50,
    fontFamily: '30PackGirlBold-jRpv',
  },
  gameOverContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    opacity: 0.5,
    zIndex: 12,
  },
  gameEngine: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10,
  },
  score: {
    paddingTop: 70,
    textAlign: 'center',
    fontSize: 40,
    zIndex: 100,
    color: '#731447',
    fontFamily: 'GrislyBeastRegular-0W9rG',
  },
  bg4: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: Constants.MAX_WIDTH,
    height: Constants.MAX_HEIGHT,
    zIndex: 0,
  },
  bg3: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    width: Constants.MAX_WIDTH,
    height: 200,
    zIndex: 1,
  },
  bg2: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    width: Constants.MAX_WIDTH,
    height: 160,
    zIndex: 2,
  },
  bg1: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    width: Constants.MAX_WIDTH,
    height: 60,
    zIndex: 3,
  },
  cloud4: coludX => ({
    position: 'absolute',
    bottom: Constants.MAX_HEIGHT - 470,
    left: Constants.MAX_WIDTH,
    right: 0,
    width: 70.8,
    height: 49.6,
    zIndex: 5,
    transform: [{ translateX: coludX }],
  }),
  cloud3: cloudX => ({
    position: 'absolute',
    bottom: Constants.MAX_HEIGHT - 320,
    left: Constants.MAX_WIDTH,
    right: 0,
    width: 70.8,
    height: 49.6,
    zIndex: 5,
    transform: [{ translateX: cloudX }],
  }),
  cloud2: cloudX => ({
    position: 'absolute',
    bottom: Constants.MAX_HEIGHT - 200,
    left: Constants.MAX_WIDTH,
    right: 0,
    width: 63.6,
    height: 32.6,
    zIndex: 5,
    transform: [{ translateX: cloudX }],
  }),
  cloud1: cloudX => ({
    position: 'absolute',
    bottom: Constants.MAX_HEIGHT - 250,
    left: Constants.MAX_WIDTH,
    right: 0,
    width: 66,
    height: 57.2,
    zIndex: 5,
    transform: [{ translateX: cloudX }],
  }),
});
