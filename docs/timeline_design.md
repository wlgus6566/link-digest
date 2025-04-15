## 🧩 타임라인 페이지 UI/UX 구성 가이드

### 1. **북마크 아이템 레이아웃**

각 북마크 아이템은 다음과 같은 요소로 구성됩니다:

- **썸네일 이미지**: 영상의 대표 이미지를 좌측에 배치하여 시각적 인지도를 높입니다.
- **영상 제목**: 썸네일 우측 상단에 제목을 명확하게 표시하여 콘텐츠 식별을 용이하게 합니다.
- **시간 정보 및 자막 요약**: 북마크된 구간의 시작 시간과 종료 시간, 해당 구간의 자막 내용을 간략하게 표시합니다.
- **메모 내용**: 사용자가 작성한 메모를 표시하여 추가적인 정보를 제공합니다.
- **메모 편집 버튼**: 메모 내용을 수정할 수 있는 버튼을 제공합니다.
- **플레이 버튼**: 해당 구간으로 직접 이동하여 영상을 재생할 수 있는 버튼을 제공합니다.

예시 레이아웃:

```
css
복사편집
[썸네일 이미지]  [영상 제목]
[00:20 - 00:45] "GPT는 자연어 처리 모델로, 다양한 언어 작업에 사용됩니다."
메모: "이 부분은 GPT의 기본 개념을 설명함." [✏️] [▶️]

```

### 2. **인터랙션 디자인**

- **자막 클릭**: 해당 자막을 클릭하면 해당 시간대로 유튜브 링크를 열어 영상을 재생합니다.
- **메모 편집 버튼**: 클릭 시 메모를 수정할 수 있는 팝업을 표시합니다.

### 3. **반응형 디자인 고려사항**

- **모바일**: 아이템을 세로로 배치하여 스크롤을 최소화하고, 터치 영역을 충분히 확보합니다.

## ✅ 기능 구조 정의

### 🎯 원하는 형태

```
▼ 00:00 - 05:00
  [00:00 - 00:20] "도입 인사말"
  [00:20 - 00:40] "소개 내용"
  ...
▼ 05:00 - 10:00
  [05:00 - 05:25] "GPT 구조 설명"

```

---

## ✅ 전체 흐름 요약

```mermaid
mermaid
복사편집
graph TD
A[YouTube 자막 원본 수집 (srt, transcript)] --> B[자막 파싱: startTime, endTime, text]
B --> C[5분 단위 타임라인 그룹핑]
C --> D[타임라인 내 개별 자막 블록 정리]
D --> E[프론트에서 타임라인/자막 렌더링]

```

### 🔹 [2] 타임라인 아코디언 (시간대별 그룹)

- **컴포넌트**: `TimelineAccordion.tsx`
- **사용 컴포넌트**: ShadCN `<Accordion />`, `<AccordionItem />`
- **시간대 그룹 (예: 00:00~5:00)** 단위로 아코디언 구분

```tsx
tsx
복사편집
<Accordion type="multiple">
  {timelineGroups.map((group) => (
    <AccordionItem value={group.range}>
      <AccordionTrigger>{group.range}</AccordionTrigger>
      <AccordionContent>
        {group.subtitles.map((block) => (
          <SubtitleBlock key={block.start} {...block} />
        ))}
      </AccordionContent>
    </AccordionItem>
  ))}
</Accordion>

```

---

## 📥 Step 1: 자막 원본 수집

### 방법:

- `youtube-transcript-api` (Python)
- `youtube-caption-scraper` (Node.js)
- `youtube-transcript` (npm)

### 수집 형태 예시:

```json
[
  {
    "start": 3.5,
    "duration": 2.0,
    "text": "안녕하세요, 오늘은 GPT에 대해 이야기해보겠습니다."
  },
  {
    "start": 6.0,
    "duration": 2.5,
    "text": "GPT는 자연어 처리 모델입니다."
  }
]
```

---

## 🧮 Step 2: 자막 파싱 → 타임라인 분할

### 1. **시간 변환 유틸리티**

```
function secondsToTimeString(seconds: number) {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

```

---

### 2. **5분 단위 타임라인으로 그룹핑**

```
const TIMELINE_BLOCK = 5 * 60; // 300초

const grouped = subtitles.reduce((acc, item) => {
  const groupIndex = Math.floor(item.start / TIMELINE_BLOCK);
  const groupKey = `${secondsToTimeString(groupIndex * TIMELINE_BLOCK)} - ${secondsToTimeString((groupIndex + 1) * TIMELINE_BLOCK)}`;

  if (!acc[groupKey]) acc[groupKey] = [];

  acc[groupKey].push({
    start: secondsToTimeString(item.start),
    end: secondsToTimeString(item.start + item.duration),
    text: item.text,
    startSeconds: item.start
  });

  return acc;
}, {});

```

- `grouped`는 다음과 같은 구조가 됩니다:

```
ts
{
  "00:00 - 05:00": [
    { start: "00:03", end: "00:05", text: "안녕하세요..." },
    ...
  ],
  "05:00 - 10:00": [ ... ]
}

```

---

## ✅ 최종 데이터 예시

```
ts
[
  {
    range: "00:00 - 05:00",
    subtitles: [
      {
        start: "00:03",
        end: "00:05",
        text: "안녕하세요, 오늘은 GPT에 대해...",
        startSeconds: 3.5
      },
      ...
    ]
  },
  ...
]

```

이 데이터를 아코디언 그룹 UI에 그대로 전달하면 됩니다.

---

## ✅ 정확한 타임라인 분할 기준

| 기준                           | 설명                                                           |
| ------------------------------ | -------------------------------------------------------------- |
| 5분 = 300초                    | 자막의 `start` 기준으로 그룹 구분                              |
| `start`는 포함, `end`는 미포함 | 예: 299.9초까지는 `00:00 - 05:00`, 300초부터는 `05:00 - 10:00` |
| 길이 0인 자막은 제외           | 보통 잘린 자막이므로 제거하는 것이 좋음                        |
