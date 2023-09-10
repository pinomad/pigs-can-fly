# Pigs Can Fly

Pigs Can Fly는 원터치 조작으로 누구나 쉽고 재밌게 즐길 수 있는 중독성 있는 iOS 게임 입니다.
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
  - [1. React Native와 React와의 차이](#1-react-native와-react와의-차이)
  - [2. 어떻게 중력을 구현할까?](#2-어떻게-중력을-구현할까)
  - [3. 어떻게 무한한 맵을 구현할까?](#3-어떻게-무한한-맵을-구현할까)
  - [4. 더 생동감 있게 할 순 없을까?](#4-더-생동감-있게-할-순-없을까)
- [Schedule](#schedule)
- [Tech Stacks](#tech-stacks)
- [Member](#member)

<br>
<br>

# Motivation

이번 프로젝트는 React Native(이하 RN)에 익숙해지는걸 목표로 삼았습니다.
몇년전에 플래피버드라는 게임을 접했습니다. 게임 자체는 정말 심플했지만 굉장히 중독성 있었고 나도 모르게 몇십분씩 즐기게 되었습니다. 하지만 원작자가 게임을 내렸고 더이상 그 게임을 해볼 수 없었습니다. 그 이후 앱스토어에 그와 비슷한 게임들이 많이 생겼지만 그 느낌과는 많이 달랐습니다. 그래서 당시 했었던 게임을 직접 구현해보고 싶어졌습니다.
<br>
<br>

# Challenges

## 1. React Native와 React와의 차이

React Native와 React는 비슷하면서도 낯설었습니다. HTML이나 React에서 익숙하게 써오던 `<div>`나 `<p>` 같은 태그들은 쓰지않고 `<View>`, `<Text>` 같은 컴포넌트들로 대체하고 있었습니다.
HTML에서 쓰던 시맨틱태그들은 없고 각각의 용도에 맞는 제한적인 컴포넌트들만 사용 가능했습니다. RN 팀에서 최소한의 컴포넌트와 API만 제공하고 나머지는 본인이 직접 만들거나 Third-Party 라이브러리를 사용하도록 권장하고 있었습니다.
css 또한 display속성은 none 과 flex밖에 없다던가, 가상선택자도 사용할 수 없는 등 제약이 많았습니다.
<br>
<br>

## 2. 어떻게 중력을 구현할까?

처음에는 물리엔진 없이 RN에서 기본적으로 제공하는 Animated API를 이용해서 중력을 구현해보았습니다. 하지만 화면의 돼지는 그저 느긋하게 둥둥 떠다니는 모습이였고 Easing메소드를 아무리 조정해봐도 실제 중력같은 생동감 있는 중력가속도를 구현하기는 어려웠습니다.
결국 물리엔진을 써야겠다는 판단을 했고 그 중 RN과 호환성이 좋고 공식문서가 잘 정리되어있는 `Matter.js`를 활용하여 중력을 구현했습니다.
<br>
<br>

## 3. 어떻게 무한한 맵을 구현할까?

처음에는 굉장히 큰 맵을 생성하고 그 맵을 돼지가 앞으로 나아가는 형태를 생각했습니다.
하지만 이 게임은 끝이 존재하지 않고 죽을때까지 계속되는 게임이기 때문에 유한한 맵을 생성하는건 적합하지 않았습니다. 게다가 굳이 반복되는 장애물을 여러번 그릴 필요도 없다는 것을 깨달았습니다. 최종적으로 돼지의 x축은 움직이지 않고 y축만 움직이며, 장애물들이 돼지를 향해 다가오는 형태를 착안했습니다.
장애물 또한 화면에 보이는 장애물의 갯수는 최대 2개이므로 맨 앞의 장애물이 화면 왼쪽으로 사라지면 화면 오른쪽에 다시 생성되는 형태로 구현을 하였습니다.

<img src="https://github.com/pinomad/pigs-can-fly/assets/42368951/f0070a87-c1ee-4061-9a27-f2c2e9def386" width="300" />
<br>
<br>

## 4. 더 생동감 있게 할 순 없을까?

아직 돼지가 나는 모습이 다소 밋밋해보였습니다. 중력가속도에 따라 몸체가 회전하게되면 좀 더 생동감 있는 연출이 가능해 보였습니다. 공식문서의 Animated API에서 [interpolate](https://reactnative.dev/docs/animations#interpolation) 메소드를 발견하여 구현 할 수 있었습니다.
interpolate란 중간값을 채운다는 의미로 Animated.Value값이 변할때 같이 변하고싶은 값을 설정하여 애니메이션을 다채롭게 해주는 메소드입니다.
아래 예시처럼 중력의 변화에 따라 몸체의 각도를 바꿔주었습니다.

```javascript
const [animatedValue] = useState(new Animated.Value(body.velocity.y));

useEffect(() => {
  animatedValue.setValue(body.velocity.y);
}, [body.velocity.y]);

const rotation = animatedValue.interpolate({
  inputRange: [-10, 0, 10, 20], // 중력이 -10에서 0으로 바뀔때의 각도는 -20deg, 0에서 10으로 바뀔때는 0deg ...이하동일
  outputRange: ['-20deg', '0deg', '20deg', '40deg'],
});
```

적용 전
<img src="https://github.com/pinomad/pigs-can-fly/assets/42368951/2f5b2edc-bc56-49f1-9c5a-4ed4753bc9d2" width="150" />
적용 후
<img src="https://github.com/pinomad/pigs-can-fly/assets/42368951/ee95ce49-4056-4fc0-83b0-eda6934f7477" width="150" />

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

## Why Expo?

Expo의 한가지 큰 특징으로는 Over The Air Update라는 기능이 있습니다.
일반적인 네이티브 앱을 수정하고 반영하려면 배포를 다시 하고 앱 스토어의 승인이되기를 기다려야 하는데 Over The Air는 내부적으로 업데이트를 진행하기때문에 추후 배포에 있어서 편리합니다.
또한 언제든지 React-Native-Cli로 돌아갈 수 있다는 장점도 있습니다.
단점으로는 일부 Native 모듈이나 API들이 지원을 안하는 경우가 있고 앱 용량도 크고 블루투스 이용이 불가하다던가 하는 이런저런 단점이 있지만 제 경우에는 큰 문제가 되지 않을 것 같아 선택했습니다.

# Member

- [이정진](https://github.com/pinomad) : pinomad20@gmail.com
