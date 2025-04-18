# 📄 **PRD: TubeLink**

---

## ✅ 1. 제품 개요

**제품 목적**:

**TubeLink**는 유튜브 영상을 AI가 자동으로 요약하고, 사용자가 **영상의 특정 구간(타임라인)**을 저장하여 **다시 보고 싶은 순간을 쉽게 복습**할 수 있도록 돕는 유튜브 전용 정리 앱입니다.

텍스트 요약뿐만 아니라, 타임스탬프 단위로 **핵심 장면 북마크** 기능을 제공하여, 콘텐츠 소비의 효율을 극대화합니다.

---

**해결하고자 하는 문제**:

- 긴 유튜브 영상에서 핵심 내용을 빠르게 파악하기 어렵다
- 유익한 장면을 저장해두고 싶지만, 다시 찾기 어렵다
- 타임라인을 기억하거나 메모해놓는 게 번거롭고 비효율적이다

---

**제공하는 가치**:

- 영상 자막 기반으로 **AI가 자동 요약**
- **사용자 지정 타임라인** 저장 → 클릭 시 해당 시점으로 이동
- 요약과 타임라인을 함께 보여주는 **블로그 스타일 콘텐츠 뷰**
- 모든 정리된 콘텐츠는 마이페이지에서 관리 및 검색 가능

---

## 👥 2. 대상 사용자

| 주요 사용자군               | 니즈 및 문제점                                                                   |
| --------------------------- | -------------------------------------------------------------------------------- |
| 자기계발/강연 콘텐츠 소비자 | 유튜브 강연에서 유용한 정보만 요약해서 보고 싶고, 특정 구간만 반복 학습하고 싶음 |
| 공부용 유튜브 사용자        | 교육 영상에서 핵심 설명 파트를 따로 저장해두고 반복 학습하고 싶음                |
| 콘텐츠 큐레이터/리서처      | 영상의 주요 포인트들을 요약 + 타임라인 단위로 스크랩하고 공유하고 싶음           |

---

## 🔄 3. 사용자 흐름

### 📽️ 시나리오: 유튜브 영상 요약 + 타임라인 저장

1. 사용자가 TubeLink에서 ‘유튜브 링크 붙여넣기’
2. AI가 영상 자막 기반으로 **요약 콘텐츠 생성**
3. 영상에서 **자동 타임라인 추출 (모든 시간단위)**
4. 사용자가 원하는 시점에 **직접 타임스탬프 저장 가능**
5. 요약 + 타임라인 정보가 블로그처럼 정리되어 저장됨

---

### 🗂 시나리오: 저장한 콘텐츠 다시 보기

1. 타임라인, 보관함에서 이전에 저장한 영상 리스트 확인
2. 타임라인에서는 저장한 타임라인 확인
3. 타임라인 클릭 시 유튜브 원본 영상에서 해당 구간으로 이동

---

## 🧩 4. 기능 요구사항

| 기능 명                   | 설명                                                       | 개발 난이도 | 우선순위 |
| ------------------------- | ---------------------------------------------------------- | ----------- | -------- |
| 유튜브 링크 입력 및 파싱  | 유튜브 URL 입력 시 영상 ID 추출 및 메타데이터 파싱         | 보통        | 상       |
| AI 콘텐츠 요약            | 영상 자막 기반으로 자동 요약 생성                          | 어려움      | 상       |
| **자동 타임라인 추출**    | 영상에서 키워드 기반으로 자동 타임라인 모두 생성           | 어려움      | **상**   |
| **타임라인 수동 저장**    | 사용자가 영상 중 원하는 타임스탬프 구간을 직접 저장        | 보통        | **상**   |
| 블로그 형식 콘텐츠 렌더링 | 요약 + 타임라인 목록이 결합된 콘텐츠 뷰                    | 쉬움        | 상       |
| 콘텐츠 저장 및 열람       | 요약 콘텐츠를 마이페이지에 저장, 다시 열람 가능            | 쉬움        | 상       |
| 타임라인 → 영상 이동      | 저장된 타임스탬프 클릭 시 유튜브 영상의 해당 구간으로 이동 | 보통        | 중       |
| 키워드 검색 및 필터       | 제목, 태그, 날짜 등으로 콘텐츠 검색 가능                   | 보통        | 중       |
| 공유 기능                 | 요약 콘텐츠와 타임라인을 링크로 공유 가능                  | 쉬움        | 하       |

✅ 핵심 차별화 포인트 요약
✅ 단순 요약이 아닌 구간별 타임라인 저장 중심

✅ 유튜브 영상 시청 → 요약/재학습까지 이어지는 학습 루프 완성

✅ 단순 저장 앱이 아닌, 나만의 유튜브 노트 정리 툴
