---
title: "Product Feedback App 개발기 1: React 기초 및 전역 상태 관리 설계"
pubDate: 2022-11-21
updatedDate: 2026-07-03
description: "React 기초 구조 설계, SVG 활용, React Router v6 도입 및 데이터 전달과 전역 상태 관리 설계 과정"
category: "Project"
tags: ["React", "React Router", "State Management"]
---

프로젝트 초기 설계 및 React 기반 구현 과정에서 발생한 기술적 문제와 해결 과정을 기록한다.

## 1. React에서 SVG 컴포넌트 활용
React 환경에서 SVG를 독립적인 컴포넌트로 활용하기 위해 다음과 같이 컴포넌트로 Import 하여 렌더링을 처리했다.
```js
import { ReactComponent as Icon } from "../assets/icon.svg";

function App() {
  return <Icon />;
}
```

## 2. React Router v6 적용
페이지 이동 처리를 위해 `react-router-dom` 라이브러리를 설치하고, 버전 6에서 변경된 스펙(기존 `Route` 내 `component` 대신 `element` 프롭 사용, `useNavigate` 도입 등)을 반영해 라우팅을 구성했다.

## 3. 부모-자식 컴포넌트 간 데이터 전달
자식 컴포넌트에서 발생한 이벤트를 부모 컴포넌트로 전달하기 위해, 부모 컴포넌트에서 콜백 함수를 프롭(Props)으로 내려주고 자식 컴포넌트가 해당 함수를 실행해 데이터를 매개변수로 전달하는 흐름을 설계했다.

## 4. 전역 상태 관리 설계 및 문제 해결
- **문제**: 로컬 환경에서 더미 JSON 데이터를 가져와 처리할 때, 추천(Upvote) 버튼 클릭에 의한 상태 변경이 상세 페이지로 유기적으로 연동되지 않는 문제가 발생했다. 단순히 특정 타겟의 DOM 객체 텍스트만 조작하도록 처리한 탓에, 데이터 흐름이 단절되는 구조적 문제가 원인이었다.
- **해결**: 
  - 더미 JSON 데이터를 React State에 직접 담아 전역에서 관리하도록 설계 구조를 바꿨다.
  - 전역 State 전체가 업데이트될 때 발생하는 불필요한 하위 컴포넌트 재렌더링 부하를 줄이기 위해, 추천(Upvote) 관련 로직을 분리하는 상태 세분화 과정을 진행했다.
