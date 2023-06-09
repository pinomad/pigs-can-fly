import React from 'react';
import { StyleSheet, View, Pressable, Image } from 'react-native';

import Title from '../components/Title';
import TapToStart from '../components/TapToStart';
import Images from '../assets/images';
import Constants from '../constants';

export default function StartGameScreen({ isTouched }) {
  const handleTouch = () => {
    isTouched(true);
  };

  return (
    <Pressable onPress={handleTouch} style={styles.container}>
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
      <View style={styles.top}>
        <Title />
      </View>
      <View style={styles.bottom}>
        <View style={styles.character}>
          <TapToStart />
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  top: {
    flex: 1.5,
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
  bg1: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    width: Constants.MAX_WIDTH,
    height: 60,
    zIndex: 3,
  },
  bg2: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    width: Constants.MAX_WIDTH,
    height: 160,
    zIndex: 2,
  },
  bg3: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    width: Constants.MAX_WIDTH,
    height: 200,
    zIndex: 1,
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
});
