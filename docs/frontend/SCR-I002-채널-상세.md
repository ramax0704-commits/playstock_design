# SCR-I002 채널 상세 / 조각정보

> 크리에이터/채널의 상세 정보, 판매 진행률, 투자자 통계를 표시하고 조각 구매를 유도하는 페이지

---

## 디자인 캡처

### 기본 화면
![SCR-I002 채널 상세](assets/DLjuk.png)

---

## 개요

- **라우트**: `/channel/:channelId` (정확한 경로는 디자이너 확인 필요)
- **사용자 목표**: 채널 정보 확인 → 판매 진행 상황 파악 → 조각 구매 결정
- **인증 필요**: 예 (조각 구매 시)

---

## 레이아웃

### 구조

페이지는 고정 헤더(status bar + top header + profile) + 스크롤 가능한 콘텐츠로 구성됩니다.

**주요 영역:**
1. **Status Bar** (44px) — 시간, 신호, 배터리 표시
2. **Top Header** (56px) — 뒤로가기, 채널명, 찜 버튼 (고정)
3. **Profile Section** (84px) — 프로필 이미지(44px 원형), 채널명, 추가 정보(구독자 수, 평균 업로드 횟수 - ex. 주 몇 회)
4. **Tab Navigation** (33px) — 3개 탭: "조각 정보" (활성), "가치 평가", "판매 이력"
5. **Sale Info Section** (601px)
   - 카로셀: 3개 채널 카드 (현재 중앙, 좌우 50% opacity) - 대표 콘텐츠 조회. 조회만 가능. 조각 판매 설정 시 링크 등록. 최소 1개, 최대 5개. 
   - Stats Grid: 1조각 가격, 배당 비율
   - Progress: 마감까지 %, progress bar, 판매 현황
   - Stats Boxes: 투자중 인원, 평균 구매 금액, 평균 구매 개수
6. **Fragment Grass** (248px) — "조각 잔디" (GitHub contribution grid 스타일) - 이거 디자인 구현이 안돼서 이따구로 됐는데요. 의도는 채널 플로필 이미지가 조각마다 들어있고 구매한 조각개수만큼 선명하게 보인다. 그리고 실제 1000개ㄹ를 조각을로 구현하긴 거시기하니 배율로 해주세요. 축..척..? 비..율?
7. **Bottom CTA** (96px) — "조각 구매하기" 버튼 (고정)

**전체 높이:** 375px × 1164px (모바일 viewport)

### 그리드 & 간격

| 요소 | 값 | 비고 |
|---|---|---|
| 페이지 너비 | 375px | 모바일 기본 너비 |
| 좌우 패딩 | 20px | 대부분의 섹션 |
| 섹션 간 갭 | 20px | 수직 정렬 |
| 아이템 갭 | 12px | 카드, 통계 등 |
| 카드 패딩 | 14px | Stats grid items |
| 탭 갭 | 30px | 탭 네비게이션 |

### 반응형 동작

| 브레이크포인트 | 동작 |
|---|---|
| 모바일 (< 768px) | **현재 디자인** — 375px 고정 너비, 수직 스크롤 |
| 태블릿 이상 | <!-- TODO: 태블릿/데스크톱 레이아웃 정의 필요 --> |

---

## 컴포넌트

### Top Header

- **타입**: 고정 헤더
- **위치**: 페이지 상단 (status bar 아래, 고정)
- **높이**: 56px
- **구성**:
  - 뒤로가기 버튼 (lucide "arrow-left", 24px)
  - 채널명 텍스트 ("뜬뜬 DdeunDdeun")
  - 찜 버튼 (lucide "heart", 24px, 아이콘만)
- **배경**: #FFFFFF
- **Props**:
  - channelName: string (예: "뜬뜬 DdeunDdeun")
  - isFavorited: boolean (아이콘 색상 변경? -> yes. primary color. stroke 없이 filled)
  - onBackPress: callback
  - onFavoritePress: callback

### Profile Section

- **타입**: 프로필 정보 카드
- **위치**: Header 아래
- **높이**: 84px
- **구성**:
  - 프로필 이미지 (44px 원형, 배경색 #C1C1C1)
  - 채널 정보 (수직 레이아웃):
    - 채널명 (Pretendard Variable, 16px, 500, #1F1F1F)
    - 추가 정보 (Pretendard Variable, 12px, #757575)
- **배경**: #FFFFFF
- **패딩**: 20px
- **갭**: 8px (정보 간)
- **Props**:
  - profileImage: url
  - channelName: string
  - additionalInfo: string

### Tab Navigation

- **타입**: 탭 메뉴
- **위치**: Profile 아래
- **높이**: 33px (콘텐츠) + 1px (border-bottom)
- **구성**: 3개 탭 아이템
  - Tab 1: "조각 정보" (활성 상태 — byahh ref, h5S7J)
  - Tab 2: "가치 평가" (비활성 — copRi ref, Kc73d)
  - Tab 3: "판매 이력" (비활성 — NVnGt ref, Kc73d)
- **활성 상태 표시**: 밑줄 (2px, $border)
- **스타일**:
  - 활성 텍스트: #1F1F1F, 500
  - 비활성 텍스트: #6B7280, 400
  - 폰트: Pretendard Variable, 14px
  - 갭: 30px (탭 간)
  - 패딩: 0 20px (좌우)
- **Props**:
  - tabs: Array<{ label: string, id: string }>
  - activeTabId: string
  - onTabChange: (tabId: string) => void

### Carousel (Channel Cards)

- **타입**: Horizontal scrollable carousel
- **위치**: Sale info section 상단
- **구성**: 3개 카드 (가운데 선택, 좌우 반투명)
  - 선택된 카드 (가운데): opacity 1.0, 높이 134px, 너비 238px
  - 좌/우 카드: opacity 0.5, 높이 107px, 너비 190px
- **갭**: 10px
- **클립**: true (overflow 숨김)
- **각 카드 구성** (하위 분석 참고):
  - 썸네일 이미지 (cornerRadius: $radius-lg, 12px)
  - 채널 정보 (갭: 6px)
- **Props**:
  - channels: Array<{ id, image, name, info }>
  - activeIndex: number
  - onChannelSelect: (index: number) => void

### Stats Grid (1조각 가격, 배당 비율)

- **타입**: 2열 그리드
- **위치**: Carousel 아래
- **구성**: 2개 카드 (각 높이 73px)
  - Card 1: "1조각 가격" ₩2,500
  - Card 2: "배당 비율" 25%
- **스타일**:
  - 배경: $bg-secondary (#F7F8FA)
  - 보더 반지름: $radius-md (8px)
  - 패딩: 14px
  - 갭: 4px (레이블-값 간)
  - 갭 (카드 간): 12px
- **텍스트**:
  - 레이블: Pretendard Variable, 11px, $text-tertiary (#9CA3AF)
  - 값: Pretendard Variable, 18px, 700, $text-primary (배당 비율은 $primary)
- **Props**:
  - pricePerFragment: number (원 단위)
  - dividendRatio: number (%)

### Progress Section

- **타입**: 진행 상황 표시
- **위치**: Stats grid 아래
- **구성**:
  1. 헤더 (수평): "마감까지" 레이블 + 우측 정렬 값
  2. 진행률 % (Pretendard Variable, 18px, 700, $primary)
  3. Progress bar:
     - 외부: 배경 #e5ebf8 (밝은 파랑)
     - 내부: filled 부분 (색상 미확인 — TODO)
     - 높이: 8px
     - 보더 반지름: $radius-full (999px)
  4. 텍스트 (Pretendard Variable, 12px, $text-secondary): "658 / 1,000 조각 판매됨"
- **갭**: 8px (요소 간)
- **Props**:
  - percentage: number (0–100)
  - sold: number (조각 수)
  - total: number (조각 수)
  - labelText: string (예: "마감까지")

**<!-- TODO: Progress bar filled color 확인 필요 -->**

### Stats Boxes (투자중, 평균 구매 금액, 평균 구매 개수)

- **타입**: 3개 정보 상자 (수직 리스트)
- **위치**: Progress section 아래
- **높이**: 각 28px
- **구성** (수평 레이아웃 — icon, label, value):
  - Box 1: 투자중 110명
    - 아이콘: phosphor "users-fill" (20px, $primary)
    - 레이블: "투자중" (14px, 500, $text-secondary)
    - 값: "110명" (14px, 600, $text-primary)
  - Box 2: 평균 구매 금액 14,954원
    - 아이콘: phosphor "currency-krw-bold" (20px, $primary)
    - 레이블: "평균 구매 금액"
    - 값: "14,954원"
  - Box 3: 평균 구매 개수 6개
    - 아이콘: phosphor "eject-fill" (20px, $primary)
    - 레이블: "평균 구매 개수"
    - 값: "6개"
- **갭**: 5px (아이콘-텍스트 간)
- **정렬**: center aligned
- **패딩**: 4px (상하)
- **Props**:
  - investors: number
  - avgAmount: number
  - avgQuantity: number

**주의:** 이전 대화에서 평균 구매 금액 아이콘이 `lucide:banknote`로 변경됨. 평균 구매 개수 아이콘이 `lucide:gift`로 변경됨. 투자중 아이콘은 `phosphor:users-fill` 유지.

### Fragment Grass (조각 잔디)

- **타입**: GitHub contribution grid
- **위치**: Sale info 아래 독립 섹션
- **높이**: 248px
- **구성**:
  - 제목: "조각 잔디" (Pretendard Variable, 14px, 700, #1A1A1A)
  - 그리드: 10행 × 5열 = 50개 셀
    - 각 셀 너비/높이: 약 15px
    - 갭: 2px (셀 간)
    - 셀 배경: 이미지 기반 ("assets/images.jpeg") + opacity 0.8
- **패딩**: 20px (섹션)
- **갭**: 20px (제목-그리드 간)
- **Props**:
  - gridData: Array<Array<{ date, count, color? }>> (또는 단순 배열)
  - <!-- TODO: 각 셀의 의미(날짜, 투자액 등) 확인 필요 -->

### Bottom CTA Button

- **타입**: 전체 너비 버튼
- **위치**: 페이지 하단 (고정)
- **높이**: 96px
- **텍스트**: "조각 구매하기"
- **스타일**:
  - 배경: $bg-primary (#FFFFFF)
  - 보더: 1px $border (#EAECEF)
  - 텍스트: Pretendard Variable, 14px, ref BKWyv (기본 버튼 컴포넌트)
  - 높이: 52px (버튼 자체)
  - 패딩: 20px 16px (섹션)
- **Props**:
  - label: string ("조각 구매하기")
  - onPress: callback
  - <!-- TODO: 버튼 상태(활성/비활성/로딩) 정의 필요 -->

---

## 상태(States)

| 상태 | 트리거 | 시각적 변화 | 비고 |
|---|---|---|---|
| 기본 | 페이지 로드 | 모든 정보 표시, "조각 정보" 탭 활성 | 현재 디자인 |
| 탭 선택 | 다른 탭 클릭 | 선택 탭 밑줄 위치 이동, 콘텐츠 변경 | "가치 평가", "판매 이력" 탭의 콘텐츠 미정 |
| 카로셀 스크롤 | 좌/우 스와이프 | 카드 슬라이드, opacity 변경 | 스크롤 애니메이션 정의 필요 |
| 로딩 | 초기 진입 | <!-- TODO: 스켈레톤 또는 로딩 상태 디자인 필요 --> | |
| 에러 | API 실패 | <!-- TODO: 에러 상태 화면 정의 필요 --> | |

---

## 인터랙션 & 화면 흐름

```
[뒤로가기 버튼 클릭] → [이전 페이지로 이동]
[찜 버튼 클릭] → [하트 아이콘 색상 변경 (활성/비활성)]
[탭 클릭] → [콘텐츠 전환 ("가치 평가", "판매 이력")]
[카로셀 스와이프] → [좌/우 카드 슬라이드]
[조각 구매하기 클릭] → [구매 모달 또는 결제 페이지로 이동]
```

---

## 디자인 토큰

### 색상

| 토큰 | 값 | 용도 |
|---|---|---|
| `$text-primary` | #1F1F1F | 제목, 값(강조 항목 제외) |
| `$text-secondary` | #6B7280 | 레이블, 보조 텍스트 |
| `$text-tertiary` | #9CA3AF | 약한 보조 텍스트 |
| `$primary` | #ff5252 | 강조, 활성 탭 밑줄, 진행률 %, 아이콘 |
| `$bg-primary` | #FFFFFF | 페이지 배경, 카드 배경 |
| `$bg-secondary` | #F7F8FA | Stats grid 카드 배경 |
| `$border` | #EAECEF | 보더 선, 탭 밑줄 |
| `$surface` | #FFFFFF | Sale info 카드 배경 |

### 타이포그래피

| 역할 | 폰트 | 크기 | 굵기 | 행간 | 비고 |
|---|---|---|---|---|---|
| 제목(Large) | Pretendard Variable | 16px | 500 | — | 채널명 |
| 수치(Large) | Pretendard Variable | 18px | 700 | — | 1조각 가격, 진행률 % |
| 제목(Medium) | Pretendard Variable | 14px | 700 | — | "조각 잔디" |
| 본문 | Pretendard Variable | 14px | 500 | — | 탭, 레이블 |
| 값(Medium) | Pretendard Variable | 14px | 600 | — | 투자중 110명 등 |
| 보조(Small) | Pretendard Variable | 12px | 400 | — | 판매 현황 |
| 캡션 | Pretendard Variable | 11px | 400 | — | Stats grid 레이블 |

### 간격

| 토큰 | 값 | 용도 |
|---|---|---|
| 섹션 패딩 | 20px | 대부분 섹션 좌우 |
| 섹션 갭 | 20px | 섹션 간 수직 |
| 카드 패딩 | 14px | Stats grid items |
| 아이템 갭 | 12px | Stats grid 카드 간격 |
| 작은 갭 | 8px | Progress 요소 간, 정보 간 |
| 아이콘 갭 | 5px | 아이콘-텍스트 간 |
| 셀 갭 | 2px | Fragment grass 셀 간 |

### 보더 반지름

| 토큰 | 값 | 용도 |
|---|---|---|
| `$radius-lg` | 12px | 카로셀 썸네일, sale info 카드 |
| `$radius-md` | 8px | Stats grid items |
| `$radius-full` | 999px | Progress bar |

---

## 개발자 참고사항

### 카로셀 구현
- **clip: true** 설정으로 overflow 숨김
- 3개 아이템만 보이지만, 실제로는 동적 데이터일 가능성
- 스와이프 애니메이션 및 관성 스크롤 필요

### Fragment Grass (조각 잔디)
- GitHub contribution grid와 유사한 UI
- 각 셀의 의미(예: 투자액, 투자 일수, 투자 횟수)와 색상 맵핑 정의 필요
- 데이터 소스 및 업데이트 주기 확인 필요

### 아이콘
- **투자중**: `phosphor:users-fill` (20px)
- **평균 구매 금액**: `lucide:banknote` (20px) — 이전 대화에서 변경됨
- **평균 구매 개수**: `lucide:gift` (20px) — 이전 대화에서 변경됨

### 상태 확인 필요
- 탭 2, 3의 콘텐츠 디자인 (현재 미정)
- Progress bar의 filled color (현재 설정 불명확)
- Fragment grass 각 셀의 색상 규칙 및 데이터 구조
- 로딩, 에러, 빈 상태 디자인
- 버튼 비활성 상태(예: 이미 구매한 조각, 판매 마감)

### 반응형 고려사항
- 현재 375px 모바일 기준 설계
- 태블릿(768px+) 및 데스크톱(1200px+) 레이아웃 미정
- **<!-- TODO: 태블릿/데스크톱 레이아웃 확인 필요 -->**

### 데이터 바인딩
- 채널명, 프로필 이미지: API 연동
- 1조각 가격, 배당 비율: 채널별 설정값
- 진행 상황(658/1,000): 실시간 업데이트 필요
- 투자자 통계: 실시간 또는 정기 갱신
- Fragment grass: 사용자의 투자 기록 기반 시각화

---

## TODO

- [ ] 탭 2, 3의 콘텐츠 디자인
- [ ] Progress bar filled color 확인
- [ ] Fragment grass 색상 맵핑 및 데이터 구조 정의
- [ ] 로딩, 에러, 빈 상태 화면 설계
- [ ] 버튼 상태(비활성, 로딩) 디자인
- [ ] 태블릿/데스크톱 레이아웃 정의
- [ ] 정확한 라우트 경로 확인 (`/channel/:id` vs 다른 패턴)
