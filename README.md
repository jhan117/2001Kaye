# 2001Kaye's Developer Archive

개발자 [2001Kaye](https://github.com/jhan117)의 개인 기술 블로그입니다.
Astro 프레임워크를 기반으로 구축되었습니다.

## 주요 기능

- **테마 설정**: 다크/라이트 모드 지원
- **페이지 전환**: View Transitions API를 사용한 SPA 형태의 페이지 전환
- **목차 (TOC)**: 스크롤 위치에 따른 동적 하이라이트 제공
- **분류**: 카테고리 및 태그 기반 포스트 필터링
- **댓글**: Giscus를 이용한 GitHub Discussions 연동
- **검색**: 클라이언트 사이드 포스트 검색 기능
- **초안 관리**: 개발 환경에서만 노출되는 초안(Draft) 기능

## 기술 스택

- **Framework**: [Astro](https://astro.build/)
- **Styling**: Vanilla CSS (CSS Variables)
- **Deployment**: [Vercel](https://vercel.com/)
- **Content**: Markdown / MDX 

## 로컬 실행 방법

| 명령어 | 설명 |
|:--------------------------|:-------------------------------------------------|
| `npm install`             | 패키지 설치 |
| `npm run dev`             | 로컬 개발 서버 실행 (`localhost:4321`) |
| `npm run new`             | 새 마크다운 포스트 생성 |
| `npm run build`           | 프로덕션 빌드 생성 (`./dist/`) |
| `npm run preview`         | 로컬 빌드 결과물 미리보기 |

## 배포

Vercel을 통해 `main` 브랜치에 코드가 푸시될 때 자동으로 배포됩니다.