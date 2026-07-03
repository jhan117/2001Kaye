---
title: "Product Feedback App 1차 리팩토링: TypeScript 도입 및 Redux Toolkit 설계"
pubDate: 2023-01-09
updatedDate: 2023-02-09
description: "React 웹 앱의 TypeScript 포팅 과정 중 마주한 각종 타입 선언 이슈 해결 및 Redux Toolkit 비동기 상태 관리 설계 회고"
category: "Project"
tags: ["React", "TypeScript", "Redux", "Testing"]
---

React 학습을 마치고 진행한 1차 리팩토링 과정에서 JS 프로젝트를 TypeScript로 전환하며 겪은 타입 설정 문제들과 Redux Toolkit 및 Jest 테스트 환경의 고도화 경험을 기록한다.

## 1. TypeScript 포팅 및 모듈/테스트 설정 트러블슈팅
- **CSS 모듈 타입 오류**: TS에서 CSS 모듈(`*.module.css`) 임포트 시 타입 부재 에러가 발생했다. 빌드 종속성 증가를 피하고자 `src` 폴더 최상단에 `declaration.d.ts` 파일을 정의하고 모듈 형식을 수동으로 확장(`declare module "*.module.css";`)하여 에러를 처리했다.
- **테스트 환경 matchMedia 오류**: Jest로 미디어 쿼리 훅을 테스트할 때 `window.matchMedia is not a function` 예외가 발생했다. JSDOM에 미구현된 메서드를 모의(Mocking)하기 위해 글로벌 윈도우 객체에 커스텀 모크 함수를 바인딩하여 문제를 해결했다.
- **HTMLElement Null 에러**: `document.getElementById` 호출 시 반환형에 `null`이 포함되어 에러가 났다. 객체 조작의 안전성이 확실한 범위 내에서 `!` 단언 연산자를 활용해 널 타입 오류를 통과시켰다.

## 2. Redux Toolkit 도입 및 TS 결합
- **AppDispatch 타입 정의**: Thunk 액션을 올바르게 디스패치하기 위해 `store.dispatch` 타입을 기반으로 `export type AppDispatch = typeof store.dispatch;`를 구성하여 동적 디스패치 구조를 완성했다.
- **직렬화 불가(Non-serializable) 오류**: 액션 페이로드에 클래스 인스턴스(Model Class)를 직접 실어 보내면서 직렬화 체크 에러가 발생했다. Redux는 불변 상태 관리를 지향하므로, 인스턴스가 아닌 순수 객체(Plain Object)나 배열 형태로 직렬화된 데이터를 보내도록 데이터 주입 흐름을 제한했다.
- **createAsyncThunk의 ThunkAPI 타입 매핑**: Thunk 내부에서 `getState`를 안전하게 사용하여 타 구성요소의 상태를 안전하게 참조할 수 있도록 `createAsyncThunk<ReturnType, ArgType, { state: RootState }>`와 같이 제네릭 타입을 추가 지정했다.

## 3. 리액트 컴포넌트 타입 설계 원칙 수립
- **type vs interface**: 성능 관점에서 타입 상속과 확장이 수월하고 선언 병합이 유리한 `interface`를 핵심 타입 설계 모델로 선택했다.
- **React.FC 지양**: `React.FC`는 암시적으로 `children` 타입을 내장하고 있어 의도하지 않은 자식 노드 주입을 막을 수 없는 한계가 있었다(React 18 이하 기준). 이에 따라 일반 함수 컴포넌트 형태(`const App = (props: AppProps) => {}`)를 채택하고 `children`은 `ReactNode` 타입을 명시적으로 받아 처리하도록 단일화했다.

## 4. 모달 포지셔닝 및 쿼리 파라미터 제어
- **포털(Portal) 오버레이 위치 계산**: 오버레이 모달을 `createPortal`을 사용하여 Body 아래로 분리하면서 기준 엘리먼트와의 상대 위치 구조가 끊어졌다. 스크롤 상황에서도 포인터가 대상 엘리먼트 옆을 유기적으로 유지하도록 `getBoundingClientRect()`의 상대 오프셋 데이터를 기반으로 모달의 좌표를 실시간으로 제어했다.
- **useSearchParams 활용**: 기존 `useNavigate`에 의한 강제 라우팅 대신 `useSearchParams`를 사용하여 쿼리 매개변수(`?sort=...`)를 제어했다. 이를 통해 불필요한 라우트 새로고침 없이 URL 필터 정렬 조건 상태를 동기화했다.

## 5. React Testing Library API 활용
- 컴포넌트 단의 렌더링 결과물을 정적 검사하기 위해 `render` 메서드를 활용했다.
- `useMediaQuery`와 같은 커스텀 훅의 개별 작동을 독립적으로 테스트하기 위해 `renderHook`을 사용했으며, 상위 프롭스의 동적 전달 변화에 따른 재실행 상태를 시뮬레이션하기 위해 `rerender`를 적극 활용했다.
