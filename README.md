# Pigs Can Fly

`Pigs Can Fly`는 원터치 조작으로 누구나 쉽고 재밌게 즐길 수 있는 중독성 있는 iOS 게임 입니다.
<br>
<br>

# Preview

<img src= "https://github.com/pinomad/pigs-can-fly/assets/42368951/cb5b330f-214c-495d-8c04-4b556c3de604" width="152" height="299" />
<br>
<br>

# Deploy

[App Store 링크](https://apps.apple.com/kr/app/pigs-can-fly/id6450533872)
<br>
<br>

# 목차

- [Pigs-can-fly](#pigs-can-fly)
- [Preview](#preview)
- [Deploy](#deploy)
- [Motivation](#motivation)
- [Challenges](#challenges)
  - [1. React Native와 React와의 차이](#1-react-native와-react의-차이)
  - [2. 어떻게 중력을 구현할까?](#2-어떻게-중력을-구현할까)
  - [3. 어떻게 무한한 맵을 구현할까?](#3-어떻게-무한한-맵을-구현할까)
  - [4. 더 생동감 있게 할 순 없을까?](#4-더-생동감-있게-할-순-없을까)
- [Schedule](#schedule)
- [Tech Stacks](#tech-stacks)
- [Member](#member)

<br>
<br>

# Motivation

이번 프로젝트는 `React Native`(이하 RN)에 익숙해지는 걸 목표로 삼았습니다.
몇 년 전에 `플래피버드`라는 게임을 접했습니다. 게임 자체는 정말 심플했지만 굉장히 중독성 있었고 어느새 빠져든 저를 보게 되었습니다. 하지만 원작자가 게임을 스토어에서 삭제했고 더 이상 그 게임을 해볼 수 없었습니다. 그 이후 앱스토어에 그와 비슷한 게임들이 많이 생겼지만, 원작의 느낌과는 많이 달랐습니다. 그래서 당시 했었던 게임을 직접 구현해보고 싶어졌습니다.

<br>
<br>

# Challenges

## 1. React Native와 React의 차이

RN은 `HTML`과 `CSS`를 사용하지 않고 [`Yoga`](https://yogalayout.com/)라는 `FlexBox` 기반의 레이아웃 엔진을 사용합니다.

> `Yoga`는 `FlexBox`기반 레이아웃을 호스트 기반으로 변경해주어 크로스플랫폼 간의 일관된 레이아웃 구성을 위해 `FaceBook`에서 개발한 레이아웃 엔진입니다.

`FlexBox`는 사용 가능한 공간에 따라 항목의 크기와 위치가 자동으로 조정되므로 반응형 레이아웃을 만들기 이상적입니다. 하지만 `HTML`과 `CSS`를 사용하지 않기 때문에 처음 사용하는 입장에서 다소 불편한 점들이 있었습니다.

### 화면 구성요소의 차이

`React Native`와 `React`는 비슷하면서도 낯설었습니다. `HTML`이나 `React`에서 익숙하게 써오던 `HTML` 태그들은 사용하지 않고 RN에서 제공하는 네이티브 UI 컴포넌트들로 대체하고 있었습니다. 예를 들어 `<div>`태그는 `<View>` 컴포넌트를 사용하여 대체 할 수 있고, `<p>`, `<span>`등의 Text 관련 태그는 `<Text>` 컴포넌트로 대체하여 사용합니다.

아래의 코드는 현재 프로젝트에서 사용한 게임 시작화면 코드의 일부입니다.

```javascript
return (
  <Pressable onPress={handleTouch} style={styles.container}>
    <Image
      source={Images.background1}
      style={styles.bg1}
      resizeMode="stretch"
    />
    <Image source={Images.background2} style={styles.bg2} resizeMode="cover" />
    <Image source={Images.background3} style={styles.bg3} resizeMode="cover" />
    <Image source={Images.background4} style={styles.bg4} resizeMode="cover" />
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
```

### 레이아웃의 차이

RN은 `FlexBox`로 레이아웃을 구성합니다. `FlexBox`를 많이 사용해보지 않았어서 처음에 적응하기가 어려웠습니다.
RN의 컴포넌트는 `display`속성의 `default`값이 `flex`이며, `flex-direction` `default`값이 `column`으로 웹과 반대입니다.
또한 웹에서 익숙하게 사용하던 `width, height`값을 이용하지 않고 `flex`의 수치로만 화면을 구성하는 것이 어색했습니다.

### 스타일의 차이

RN은 `CSS`를 사용하지 않아 `JavaScript`로 스타일을 적용해야 합니다. 웹에서의 `id, class` 등의 선택자를 이용해 요소를 선택하고 스타일을 적용하는 방식이 아닌, `StyleSheet.create()` 메소드를 이용해 스타일 객체를 생성하여 스타일을 적용합니다.

웹에서의 `inline, internal, external`방식에 따른 우선순위도 존재하지 않으며 컴포넌트에 `props`로 스타일을 전달할 때 나중에 전달한 스타일이 유일한 우선순위가 됩니다.

CSS의 가상 클래스(`:hover, :nth-child`), 자식&형제 선택자(`>, +`), 가상 요소(`::before, ::after`) 등 CSS에서 편리하게 사용할 수 있는 기능을 제공하지 않습니다. 해당 기능들이 필요하다면 직접 스크립트로 처리를 해야 하기 때문에 작업 시 다소 불편한 점이 있었습니다.  
또한 축약형으로 작성한 스타일이 화면에 적용되지 않아 찾아보니 축약형 또한 지원하지 않는다는 것을 알게 되었습니다.

### 단위의 차이

웹에서 `fontSize`나 `padding`값 등을 입력할 때 사용하는 `px, em, rem`과 같은 단위도 사용하지 않고, 단지 `fontSize: 30` 과 같이 숫자만 사용합니다. 이 값은 `DP(DIP)`란 단위로 치환됩니다. `DP`는 `density-independent pixels`로 디바이스의 화면 크기나 해상도에 따라 자동으로 조정되어서 모바일 환경에서 사용하기 적합합니다.

실제로 RN 오픈소스에서 `DP`단위을 사용한다는 것을 확인할 수 있었습니다.
아래는 Android 환경에서 UI 요소의 레이아웃을 관리하는 `LayoutShadowNode.java`의 일부입니다.

```Java
public class LayoutShadowNode extends ReactShadowNode {

  @ReactProp(name = ViewProps.WIDTH, defaultFloat = CSSConstants.UNDEFINED)
  public void setWidth(float width) {
    setStyleWidth(CSSConstants.isUndefined(width) ? width : PixelUtil.toPixelFromDIP(width));
  }
  ...
```

<br>
<br>

## 2. 어떻게 중력을 구현할까?

처음에는 물리엔진 없이 RN에서 기본적으로 제공하는 `Animated API`를 이용해서 중력을 구현해보았습니다. 하지만 `Easing`모듈을 활용해봐도 실제 중력 같은 생동감 있는 중력가속도를 구현하기는 어려웠습니다.

<img src= "https://github.com/pinomad/pigs-can-fly/assets/42368951/358e54da-cf47-44ef-a34b-2d5199c6b955" width="200" height="350" />

`Animated API`를 활용한 중력 애니메이션

```javascript
const [positionY, setPositionY] = useState(new Animated.Value(-1));
const [velocityY, setVelocityY] = useState(new Animated.Value(0));
const jumpValue = -15;

const gravityAnimation = () => {
  Animated.timing(positionY, {
    toValue: 1,
    duration: 600,
    easing: Easing.easeIn, // 점점 빠르게
    useNativeDriver: true,
  }).start();
};

const jumpAnimation = () => {
  setVelocityY(jumpValue);
  Animated.timing(positionY, {
    toValue: -1,
    duration: 400,
    easing: Easing.easeIn, // 점점 빠르게
    useNativeDriver: true,
  }).start(() => {
    gravityAnimation();
  });
};

useEffect(() => {
  gravityAnimation();
}, []);
```

결국 물리엔진을 도입해야겠다고 판단했습니다.
JavaScript 기반의 2D 물리엔진은 `Planck.js`, `p2.js`, `Matter.js` 등이 있었습니다.

### 2D 물리엔진 비교

저는 물리엔진을 선택하기 위해 몇 가지 기준을 정했습니다.

- 업데이트를 자주 하는지
- 러닝 커브가 높지 않은지
- 공식문서가 잘 정리되어있고 보기 편한지
- 대중성이 높은지

먼저 GitHub 저장소의 커밋 빈도와 마지막 커밋 일자를 확인해보았습니다.

|             | `Planck.js` | `p2.js`   | `Matter.js` |
| ----------- | ----------- | --------- | ----------- |
| 커밋 빈도   | 1달 ~ 1년   | 1달 ~ 1년 | 1달 ~ 2달   |
| 마지막 커밋 | 22년 3월    | 18년 4월  | 23년 3월    |

`p2.js`는 마지막 커밋일자가 18년 4월이며 그 전의 커밋 주기도 거의 1년에 한 번 꼴로 프로젝트에 거의 손을 놓은 것으로 보여서 제외하였습니다.
나머지 두 엔진의 러닝 커브를 확인해보고자 간단하게 중력을 구현해보았습니다.

### Planck.js

<img src= "https://github.com/pinomad/pigs-can-fly/assets/42368951/61c7d3a6-337b-4e04-8616-b5ba08622657" width="200" height="350" />

`Planck.js`를 활용한 중력 애니메이션

```javascript
import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Pressable, Dimensions } from 'react-native';
import { World, Box, Vec2 } from 'planck-js';

export default function App() {
  const [position, setPosition] = useState({ y: 0 });
  const world = useRef(new World({ gravity: new Vec2(0, -20) }));
  const body = useRef(null);

  useEffect(() => {
    const screenWidth = Dimensions.get('window').width;
    const boxX = screenWidth / 2;
    const boxBody = world.current.createDynamicBody({
      position: new Vec2(boxX, 0),
    });
    const boxShape = new Box(1, 1);
    body.current = boxBody;
    boxBody.createFixture(boxShape, 1);

    gameLoop();
  }, []);

  const gameLoop = () => {
    world.current.step(1 / 60);
    const boxPosition = body.current.getPosition();

    setPosition({
      y: -boxPosition.y * 60,
    });

    requestAnimationFrame(gameLoop);
  };

  const handlePress = () => {
    body.current.applyLinearImpulse(
      new Vec2(0, 60),
      body.current.getPosition(),
      true,
    );
  };

  return (
    <Pressable onPress={handlePress} style={styles.container}>
      <View style={[styles.box, { top: position.y }]} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    width: 50,
    height: 50,
    backgroundColor: 'orangered',
    position: 'absolute',
  },
});
```

`Planck.js`의 경우 `Vec2()`메소드를 활용하여 2차원 벡터로 물리 연산을 합니다. 대체로 중력을 구현하는 데 큰 어려움은 없었지만, 속력과 힘을 표현할 때나 물체의 좌표를 표현할 때 모두 `Vec2()` 메소드를 사용하는 부분이 다소 헷갈렸습니다. 다만 공식문서가 다소 빈약한 부분이 아쉬웠습니다.
예를 들어 `createDynamicBody()` 라는 메소드를 활용해 동적인 물체를 표현하는데 이 부분이 공식문서에 없어서 찾는 데 시간이 걸렸습니다.
그리고 직접 `setInterval()`이나 `requestAnimationFrame()`을 이용하여 애니메이션 루프를 구현해야 했습니다.

### Matter.js

<img src= "https://github.com/pinomad/pigs-can-fly/assets/42368951/71e4aadd-d6dc-4a49-b36c-ecc898f98456" width="200" height="350" />

`Matter.js`를 활용한 중력 애니메이션

```javascript
import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, Dimensions, Pressable } from 'react-native';
import { Engine, World, Bodies, Runner, Render } from 'matter-js';

const { width, height } = Dimensions.get('window');
const boxSize = 50;

export default function App() {
  const [box, setBox] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const engine = Engine.create();

    const render = Render.create({
      element: containerRef.current,
      engine: engine,
      options: {
        width,
        height,
        wireframes: false,
        background: 'white',
      },
    });

    const boxBody = Bodies.rectangle(
      width / 2,
      height - boxSize / 2,
      boxSize,
      boxSize,
      {
        render: {
          fillStyle: 'pink',
        },
      },
    );

    const ground = Bodies.rectangle(width / 2, height - 5, width, 10, {
      isStatic: true,
    });

    World.add(engine.world, [boxBody, ground]);
    Runner.run(engine);
    Render.run(render);
    engine.world.gravity.y = 1.7;
    setBox(boxBody);

    return () => {
      Render.stop(render);
      Runner.stop(engine);
      World.clear(engine.world);
      Engine.clear(engine);
    };
  }, []);

  const handlePress = () => {
    if (box) {
      Body.applyForce(box, box.position, { x: 0, y: -0.18 });
    }
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={handlePress} style={styles.gameContainer}>
        <View ref={containerRef}></View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gameContainer: {
    flex: 1,
  },
});
```

`Matter.js`의 경우에는 `Plank.js`에 비해 객체 명이나 메소드 명이 좀 더 직관적으로 보였고 사용하기도 편했습니다. 또한 `Render, Runner API` 등을 활용하여 자체적으로 애니메이션 루프를 구현할 수 있었습니다.

### 결론

|          | `Planck.js` | `Matter.js` |
| -------- | ----------- | ----------- |
| 러닝커브 | 중          | 하          |
| 대중성   | 385         | 9153        |
| 공식문서 | 다소 불편   | 편함        |
| 소요시간 | 4시간       | 2시간30분   |

공식문서의 경우에 [Planck.js](https://piqnt.com/planck.js/docs/body)에 비해 [Matter.js](https://brm.io/matter-js/docs/)가 더 사용자 친화적으로 잘 설명해주어서 작업에 걸린 시간이 줄어들었습니다.

추가로 23년 1월 기준 [npm trends](https://npmtrends.com/matter-js-vs-planck-js)에서 다운로드 수를 비교했을시 `385 vs 9153`으로 `Matter.js`가 월등히 많은 사용량을 보였습니다.
따라서 러닝 커브가 낮으며 공식문서가 잘 정리되어있고 가장 대중적인 라이브러리인 `Matter.js` 를 선택하여 중력을 구현하였습니다.
<br>
<br>

## 3. 어떻게 무한한 맵을 구현할까?

<img src="https://github.com/pinomad/pigs-can-fly/assets/42368951/f0070a87-c1ee-4061-9a27-f2c2e9def386" width="300" />

처음에는 굉장히 큰 맵을 생성하고 그 맵을 돼지가 앞으로 나아가는 형태를 생각했습니다.
하지만 이 게임은 끝이 존재하지 않고 죽을 때까지 계속되는 게임이기 때문에 유한한 맵을 생성하는 건 적합하지 않았습니다. 게다가 굳이 반복되는 장애물을 여러 번 그릴 필요도 없다는 것을 깨달았습니다. 최종적으로 돼지의 x축은 움직이지 않고 y축만 움직이며, 장애물들이 돼지를 향해 다가오는 형태를 착안했습니다.
장애물 또한 화면에 보이는 장애물의 개수는 최대 2개이므로 맨 앞의 장애물이 화면 왼쪽으로 사라지면 화면 오른쪽에 다시 생성되는 형태로 구현하였습니다.

<br>
<br>

## 4. 더 생동감 있게 할 순 없을까?

<img src="https://github.com/pinomad/pigs-can-fly/assets/42368951/2f5b2edc-bc56-49f1-9c5a-4ed4753bc9d2" width="180" />

적용 전 : 몸이 회전하지 않습니다.

아직 돼지가 나는 모습이 다소 밋밋해 보였습니다. `플래피버드` 원작에서는 중력가속도에 따라 몸체가 회전하게 되면서 좀 더 생동감 있는 연출이 있었습니다. 해당 애니메이션을 공식문서의 `Animated API`에서 [interpolate](https://reactnative.dev/docs/animations#interpolation) 메소드를 발견하여 구현할 수 있었습니다.
`interpolate`(보간)란 중간값을 채운다는 의미로 쉽게 말해 두 점을 연결하는 방법이라고 보면 됩니다.

<img src="https://github.com/pinomad/pigs-can-fly/assets/42368951/260abac1-6f62-4dd2-bcdd-aeef99a97fd4" width="400" />

`Animated.Value`값이 변할 때 같이 변하고 싶은 값을 설정하여 종속적으로 값이 변하게 되어 애니메이션을 다채롭게 해주는 메소드입니다.
아래처럼 중력의 변화에 따라 몸체의 각도를 바꿔주었고 좀 더 생동감 있는 연출이 가능해졌습니다.

```javascript
const [animatedValue] = useState(new Animated.Value(body.velocity.y));

useEffect(() => {
  animatedValue.setValue(body.velocity.y);
}, [body.velocity.y]);

const rotation = animatedValue.interpolate({
  inputRange: [-10, 0, 10, 20],
  outputRange: ['-20deg', '0deg', '20deg', '40deg'],
});
```

<img width="700" alt="image" src="https://github.com/pinomad/pigs-can-fly/assets/42368951/9bd23321-7f5e-457a-8751-db9c2f70bddb">

<img src="https://github.com/pinomad/pigs-can-fly/assets/42368951/ee95ce49-4056-4fc0-83b0-eda6934f7477" width="180" />

적용 후 : 중력 가속도에 비례하여 몸이 회전합니다.

<br>
<br>

# Schedule

### 프로젝트 기간: 2023.03.27(월) ~ 2023.04.28(금)

- 1주차 : 아이디어 수집 및 기획
- 2 ~ 5주차 : 기능 개발

# Tech Stacks

- React Native
- Expo
- React-Native-Game-Engine
- Matter.js
- ESLint

## Why React-Native-Game-Engine?

`React-Native-Game-Engine`은 RN에서 게임을 만들기 위한 다양한 기능을 지원하는 경량 게임엔진입니다. 순수 JS기 때문에 사용하기 쉽고, 간단한 게임을 만들기에 적합합니다.
또한 공식문서에서 `Matter.js`를 사용하라고 권장할 정도로 `Matter.js`와의 호환성이 좋습니다.

아래는 게임엔진이 제공하는 기능들입니다.

- 게임의 상태 관리 : 게임이 실행 중인지 아닌지를 판단 할 수 있습니다.
- 엔티티 관리 : 게임 엔티티들을 정의하고 관리합니다.
- 물리엔진 처리 : 엔티티 간의 물리적 상호작용을 지원합니다.
- 게임루프 관리 : 엔티티를 프레임마다 업데이트해줍니다. (60FPS)
- 이벤트 처리 : 이벤트 핸들러를 통해 게임오버, 점수갱신 등의 이벤트를 처리할 수 있습니다.

## Why Expo?

`Expo`의 한 가지 큰 특징으로는 `Over The Air`라는 업데이트 기능이 있습니다.
일반적인 네이티브 앱을 수정하고 반영하려면 배포를 다시 하고 앱 스토어의 승인되기를 기다려야 하는데 `Over The Air`는 내부적으로 업데이트를 진행하기 때문에 추후 배포에 있어서 편리합니다.
또한 언제든지 `React-Native-Cli`로 돌아갈 수 있다는 장점도 있습니다.
단점으로는 일부 Native 모듈이나 API들이 지원을 안 하는 경우가 있고 앱 용량도 크고 블루투스 이용이 불가하다든가 하는 단점들이 있지만 제 경우에는 큰 문제가 되지 않을 것 같아 선택했습니다.

# Member

- [이정진](https://github.com/pinomad) : pinomad20@gmail.com
