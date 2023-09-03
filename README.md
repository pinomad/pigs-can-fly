# Pigs Can Fly

Pigs Can Fly는 원터치 조작으로 누구나 쉽고 재밌게 즐길 수 있는 중독성 있는 iOS 게임 입니다.
<br>
<br>

# Deploy

iOS only : [App Store 링크](https://apps.apple.com/at/app/pigs-can-fly/id6450533872)
<br>
<br>

# 목차

- [Pigs-can-fly](#-pigs-can-fly)
- [Deploy](#-deploy)
- [Motivation](#-motivation)
- [Challenges](#-challenges)
  - [1. React Native와 React와의 차이](#1)
  - [2. 어떻게 역동적인 움직임을 구현할까](#2)
  - [3. 프레임 드랍 문제](#3)
- [Schedule](#-schedule)
- [Tech Stacks](#-tech-stacks)
- [Repository Link](#-repository-link)
- [Member](#-member)

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

## 2. 어떻게 역동적인 움직임을 구현할까

처음에는 물리엔진 없이 RN에서 기본적으로 제공하는 Animated API를 이용해서 구현해보았습니다. 하지만 화면의 돼지는 그저 느긋하게 둥둥 떠다니는 모습이였고 Easing메소드를 아무리 조정해봐도 제가 원하는 빠릿빠릿한 움직임을 구현하기는 어려웠습니다. 결국 다이나믹한 게임을 연출하기 위해 `Matter.js`를 사용하였습니다.

## 3. 프레임 드랍 문제

움직임을 구현 하고 파이프 장애물을 구현하던 중 화면이 뚝뚝 끊기는 현상이 발생했습니다.

<!--
## why expo, react-natve-game-engine, matter.js? -->

<br>

# Schedule

### 프로젝트 기간: 2023.03.27(월) ~ 2023.04.28(금)

- 1주차 : 아이디어 수집 및 기획
- 2 ~ 5주차 : 기능 개발

# Tech Stacks

- React Native
- Expo
- React-Native-Game-Engine
- matter.js
- ESLint

<br>
<br>

# Member

- [이정진](https://github.com/pinomad) : pinomad20@gmail.com
