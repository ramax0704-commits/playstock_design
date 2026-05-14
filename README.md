# playstock_design

디자이너와 개발자가 함께 사용하는 디자인 문서 자동화 저장소입니다.
Pencil으로 만든 디자인 파일을 열면 AI가 자동으로 개발 문서를 만들어줍니다.

---

## 사용 방법

> 아래 순서대로만 따라오시면 됩니다.

### 준비물
- [Claude Code](https://claude.ai/code) 설치 (한 번만 하면 됩니다)
- 작업하신 `.pen` 파일

---

### 1단계 — 이 폴더를 Claude Code로 열기

1. Claude Code 앱을 실행합니다
2. `playstock_design` 폴더를 엽니다
   - 메뉴에서 **File → Open Folder** 또는 터미널에서 `cd playstock_design` 입력

---

### 2단계 — 디자인 파일 열기

Pencil에서 완성한 `.pen` 파일을 Claude Code 안에서 엽니다.

```
Claude Code 채팅창에 입력:
"design.pen 파일 열어줘"
```

또는 직접 `/pencil open_document` 명령어로 파일 경로를 지정할 수 있습니다.

---

### 3단계 — 문서 자동 생성

채팅창에 커맨드를 입력하면 AI가 디자인을 읽고 문서를 자동으로 만들어줍니다.

#### 프론트엔드 문서 만들기 (페이지별)
```
/frontend
```
→ `docs/frontend/` 폴더에 페이지별 `.md` 파일이 생성됩니다

특정 페이지만 만들고 싶다면:
```
/frontend 홈화면
```

#### 백엔드 문서 만들기 (기능별)
```
/backend
```
→ `docs/backend/` 폴더에 기능별 `.md` 파일이 생성됩니다

특정 기능만 만들고 싶다면:
```
/backend 로그인
```

---

### 4단계 — 결과 확인 및 공유

생성된 파일들은 `docs/` 폴더에서 확인할 수 있습니다.

```
docs/
├── frontend/
│   ├── INDEX.md         ← 전체 페이지 목록
│   ├── 홈화면.md
│   ├── 상품목록.md
│   └── ...
└── backend/
    ├── INDEX.md         ← 전체 기능 목록
    ├── 인증.md
    ├── 상품관리.md
    └── ...
```

파일을 개발자에게 공유하거나, GitHub에 올리면 개발자가 바로 참고할 수 있습니다.

---

### 자주 묻는 질문

**Q: AI가 디자인을 잘못 이해하면 어떡하나요?**
A: 문서에 `<!-- TODO: 디자이너 확인 필요 -->` 라고 표시된 부분을 찾아서 직접 수정하시거나, 채팅창에 "XX 페이지의 버튼 동작을 수정해줘"라고 말씀해주세요.

**Q: 디자인을 수정하면 문서도 다시 만들어야 하나요?**
A: 네, 수정 후 같은 커맨드(`/frontend` 또는 `/backend`)를 다시 입력하면 문서가 업데이트됩니다.

**Q: 어떤 내용이 문서에 포함되나요?**
- `/frontend` → 화면 레이아웃, 컴포넌트 목록, 상태(State), 인터랙션, 디자인 토큰(색상·폰트·간격)
- `/backend` → 데이터 구조, API 목록, 유효성 검사 규칙, 비즈니스 로직

---

## 개발자

### 문서 구조

```
docs/
├── frontend/        # 페이지별 UI 스펙 (컴포넌트, 상태, 디자인 토큰)
└── backend/         # 기능별 API 스펙 (데이터 모델, 엔드포인트, 비즈니스 로직)
```

### 커맨드 추가/수정

커맨드 로직은 `.claude/commands/` 에 있습니다:
- `.claude/commands/frontend.md` — `/frontend` 커맨드 정의
- `.claude/commands/backend.md` — `/backend` 커맨드 정의

Pencil MCP 도구(`get_editor_state`, `snapshot_layout`, `batch_get`, `get_variables` 등)를 사용해 `.pen` 파일을 읽고 문서를 생성합니다.

### 협업 워크플로우

```
디자이너 → Pencil에서 디자인 완성
        → /frontend, /backend 실행
        → docs/ 커밋 & PR
개발자  → docs/ 읽고 구현
        → 모호한 부분은 TODO 주석 기준으로 디자이너에게 질문
```

---

## 폴더 구조

```
playstock_design/
├── .claude/
│   └── commands/
│       ├── frontend.md    # /frontend 커맨드
│       └── backend.md     # /backend 커맨드
├── docs/
│   ├── frontend/          # 페이지별 프론트엔드 스펙
│   └── backend/           # 기능별 백엔드 스펙
└── README.md
```
