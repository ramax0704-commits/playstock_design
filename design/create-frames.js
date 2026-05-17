const fs = require('fs');
const path = require('path');

// 파일 경로
const filePath = path.join(__dirname, 'pencil-new.pen');

// 기존 파일 읽기
let fileContent = fs.readFileSync(filePath, 'utf-8');
let data = JSON.parse(fileContent);

// ID 생성 함수
function generateId() {
  return Math.random().toString(36).substring(2, 9);
}

// 텍스트 노드 - 모든 필수 속성 포함
function createText(text, x, y, width, height, fontSize, fontWeight, color) {
  return {
    id: generateId(),
    type: "text",
    name: text.substring(0, 15),
    x: x,
    y: y,
    width: width,
    height: height,
    rotation: 0,
    content: text,
    style: {
      fontSize: fontSize,
      fontWeight: fontWeight,
      color: color,
      fontFamily: "Noto Sans KR",
      textAlign: "left",
      verticalAlign: "top",
      lineHeight: 1.4,
      letterSpacing: 0
    },
    constrainProportions: false,
    visible: true
  };
}

// 사각형 노드 - 타입 에러 수정됨 (rect -> rectangle)
function createRect(x, y, width, height, fill, stroke, strokeWidth) {
  return {
    id: generateId(),
    type: "rectangle",
    name: "Rectangle",
    x: x,
    y: y,
    width: width,
    height: height,
    rotation: 0,
    style: {
      fill: fill,
      stroke: stroke || "none",
      strokeWidth: strokeWidth || 0,
      strokeLinecap: "butt",
      strokeLinejoin: "miter"
    },
    constrainProportions: false,
    visible: true,
    cornerRadius: {
      topLeft: 0,
      topRight: 0,
      bottomLeft: 0,
      bottomRight: 0
    }
  };
}

// 프레임 생성 함수
function createFrame(name, x, y, width, height, children) {
  return {
    id: generateId(),
    type: "frame",
    name: name,
    x: x,
    y: y,
    width: width,
    height: height,
    rotation: 0,
    style: {
      fill: "#FFFFFF",
      stroke: "none",
      strokeWidth: 0
    },
    constrainProportions: false,
    visible: true,
    children: children || []
  };
}

// C001: 채널 연결
const frameC001 = createFrame(
  "C001-채널연결",
  0,
  0,
  375,
  812,
  [
    createText("채널 연결", 16, 60, 343, 32, 26, 700, "#1A1A1A"),
    createText("YouTube 계정에 로그인하고 채널을 선택해주세요.", 16, 100, 343, 40, 14, 400, "#666666"),
    createRect(16, 260, 343, 52, "#FF5252", "none", 0),
    createText("YouTube로 연결하기", 100, 275, 175, 22, 14, 600, "#FFFFFF")
  ]
);

// C002: 채널 정보 확인
const frameC002 = createFrame(
  "C002-채널정보확인",
  400,
  0,
  375,
  812,
  [
    createText("< 채널 정보 확인", 16, 20, 343, 24, 14, 600, "#1A1A1A"),
    createText("채널명", 140, 120, 95, 40, 18, 700, "#1A1A1A"),
    createText("구독자", 16, 180, 100, 16, 12, 500, "#666666"),
    createText("100만명", 16, 200, 100, 20, 18, 700, "#000000"),
    createText("업로드 주기", 16, 240, 100, 16, 12, 500, "#666666"),
    createText("주 3회", 16, 260, 100, 20, 14, 400, "#1A1A1A"),
    createRect(16, 720, 343, 52, "#FF5252", "none", 0),
    createText("정보 확인 완료", 100, 735, 175, 22, 14, 600, "#FFFFFF")
  ]
);

// C003: 심사 제출
const frameC003 = createFrame(
  "C003-심사제출",
  800,
  0,
  375,
  812,
  [
    createText("< 심사 진행", 16, 20, 343, 24, 14, 600, "#1A1A1A"),
    createRect(16, 80, 80, 28, "#FFA500", "none", 0),
    createText("심사 중", 26, 88, 60, 12, 12, 600, "#FFFFFF"),
    createText("채널 심사가 진행 중입니다.", 16, 140, 343, 24, 16, 700, "#1A1A1A"),
    createText("예상 소요 시간: 1~2일", 16, 170, 343, 40, 14, 400, "#666666"),
    createText("● 자동 심사  ● 전문가 검수  ○ 결과 안내", 16, 280, 343, 40, 12, 400, "#666666"),
    createText("잠시만 기다려주세요...", 16, 400, 343, 20, 14, 400, "#666666")
  ]
);

// C004: 심사 승인
const frameC004 = createFrame(
  "C004-심사승인",
  1200,
  0,
  375,
  812,
  [
    createText("축하합니다!", 16, 60, 343, 32, 26, 700, "#1A1A1A"),
    createText("✓", 150, 140, 75, 80, 60, 700, "#2ECC71"),
    createText("채널 심사 승인", 16, 250, 343, 24, 18, 700, "#1A1A1A"),
    createText("이제 조각을 판매할 수 있습니다.", 16, 280, 343, 20, 14, 400, "#666666"),
    createRect(16, 340, 343, 80, "#F8F7F5", "#EEEEEE", 1),
    createText("채널명 | 예시 채널", 28, 360, 300, 16, 12, 400, "#1A1A1A"),
    createRect(16, 720, 343, 52, "#FF5252", "none", 0),
    createText("조각 판매 설정으로 이동", 60, 735, 255, 22, 14, 600, "#FFFFFF")
  ]
);

// C005: 심사 반려
const frameC005 = createFrame(
  "C005-심사반려",
  1600,
  0,
  375,
  812,
  [
    createText("심사 결과", 16, 60, 343, 24, 18, 700, "#1A1A1A"),
    createText("!", 150, 140, 75, 80, 60, 700, "#FFA500"),
    createText("심사 불승인", 16, 250, 343, 24, 18, 700, "#1A1A1A"),
    createText("아래 사유를 확인하고 재신청해주세요.", 16, 280, 343, 20, 14, 400, "#666666"),
    createRect(16, 340, 343, 80, "#F8F7F5", "#EEEEEE", 1),
    createText("반려 사유: 채널 정책 위반", 28, 360, 300, 16, 12, 400, "#1A1A1A"),
    createRect(16, 700, 343, 52, "#FF5252", "none", 0),
    createText("채널 재연결", 120, 715, 135, 22, 14, 600, "#FFFFFF"),
    createRect(16, 760, 343, 48, "#F0F0F0", "#EEEEEE", 1),
    createText("나중에", 140, 772, 95, 20, 14, 600, "#666666")
  ]
);

// C006: 조각 판매 설정
const frameC006 = createFrame(
  "C006-조각판매설정",
  2000,
  0,
  375,
  1200,
  [
    createText("< 조각 판매 설정", 16, 20, 343, 24, 14, 600, "#1A1A1A"),
    createText("조각 정보", 16, 80, 100, 18, 16, 700, "#1A1A1A"),
    createText("총 조각 수", 16, 120, 100, 12, 12, 500, "#666666"),
    createRect(16, 140, 343, 48, "#FFFFFF", "#EEEEEE", 1),
    createText("예: 500", 24, 153, 327, 20, 14, 400, "#999999"),
    createText("1조각 가격 (원)", 16, 210, 100, 12, 12, 500, "#666666"),
    createRect(16, 230, 343, 48, "#FFFFFF", "#EEEEEE", 1),
    createText("예: 1,000", 24, 243, 327, 20, 14, 400, "#999999"),
    createText("배당 정보", 16, 320, 100, 18, 16, 700, "#1A1A1A"),
    createText("월 배당 비율 (%)", 16, 360, 100, 12, 12, 500, "#666666"),
    createRect(16, 380, 343, 48, "#FFFFFF", "#EEEEEE", 1),
    createText("예: 20", 24, 393, 327, 20, 14, 400, "#999999"),
    createText("배당 기간 (개월)", 16, 460, 100, 12, 12, 500, "#666666"),
    createRect(16, 480, 343, 40, "#FFFFFF", "#EEEEEE", 1),
    createText("12개월  24개월  36개월", 26, 490, 320, 20, 12, 400, "#1A1A1A"),
    createRect(16, 540, 343, 100, "#F8F7F5", "#EEEEEE", 1),
    createText("총 판매 금액", 28, 552, 100, 12, 12, 500, "#666666"),
    createText("500,000원", 28, 570, 300, 18, 18, 700, "#000000"),
    createText("예상 월 배당", 28, 600, 100, 12, 12, 500, "#666666"),
    createText("8,333원", 28, 618, 300, 18, 18, 700, "#000000"),
    createRect(16, 1100, 343, 52, "#FF5252", "none", 0),
    createText("다음", 140, 1115, 95, 22, 14, 600, "#FFFFFF"),
    createRect(16, 1160, 343, 48, "#F0F0F0", "#EEEEEE", 1),
    createText("취소", 140, 1172, 95, 20, 14, 600, "#666666")
  ]
);

// C007: 판매 등록 완료
const frameC007 = createFrame(
  "C007-판매등록완료",
  2400,
  0,
  375,
  812,
  [
    createText("판매 등록 완료", 16, 60, 343, 32, 26, 700, "#1A1A1A"),
    createText("✓", 150, 140, 75, 80, 60, 700, "#2ECC71"),
    createText("조각 판매 설정 완료", 16, 250, 343, 24, 18, 700, "#1A1A1A"),
    createText("투자자들이 이제 조각을 구매할 수 있습니다.", 16, 280, 343, 30, 14, 400, "#666666"),
    createRect(16, 340, 343, 150, "#F8F7F5", "#EEEEEE", 1),
    createText("등록된 정보", 28, 352, 100, 12, 12, 500, "#666666"),
    createText("채널명 | 예시 채널", 28, 375, 300, 12, 12, 400, "#1A1A1A"),
    createText("조각 수 | 500개", 28, 395, 300, 12, 12, 400, "#1A1A1A"),
    createText("가격 | 1,000원", 28, 415, 300, 12, 12, 400, "#1A1A1A"),
    createText("배당비율 | 20%", 28, 435, 300, 12, 12, 400, "#1A1A1A"),
    createText("기간 | 12개월", 28, 455, 300, 12, 12, 400, "#1A1A1A"),
    createRect(16, 700, 343, 52, "#FF5252", "none", 0),
    createText("마이페이지로 이동", 70, 715, 235, 22, 14, 600, "#FFFFFF"),
    createRect(16, 760, 343, 48, "#F0F0F0", "#EEEEEE", 1),
    createText("채널 리스트", 120, 772, 135, 20, 14, 600, "#666666")
  ]
);

// *** 여기부터 교체 ***

// 모든 프레임
const frames = [frameC001, frameC002, frameC003, frameC004, frameC005, frameC006, frameC007];

// 파일 업데이트
if (!data.children) {
  data.children = [];
}

// 프레임들을 가로로 나열하기 위한 변수
let currentX = 0;
const frameMargin = 50; // 프레임 사이 간격 (원하는 대로 조절해!)

// frames 배열을 돌면서 x 좌표 업데이트
for (let frame of frames) {
  frame.x = currentX;
  currentX += frame.width + frameMargin;
}

// data.children에 정렬된 frames 대입
data.children = frames;

// *** 여기까지 교체 ***

// 저장
fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');