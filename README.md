## MyongJiMon 웹사이트

**명지전문대 2025년 캡스톤 디자인 졸업 작품**

- **목표**: 명지전문대 학생 및 교직원을 위한 커뮤니티 웹사이트 개발
- **주요 기능**: 게시판, 로그인/회원가입, 공지사항 등
- **배포 환경**: Azure

### 기술 스택

- **프론트엔드**: React
- **백엔드**: Node.js (Express)
- **데이터베이스**: MySQL
- **버전 관리**: GitHub
- **협업 도구**: GitHub Desktop

---

## 프로젝트 구조

```
MyongJiMon-Website/
├── frontend/   # React 기반 프론트엔드
├── backend/    # Node.js 기반 백엔드
├── README.md
└── .gitignore
```

---

## 실행 방법

### 프론트엔드

```bash
cd frontend
npm install
npm start
```

- 기본 실행 주소: `http://localhost:3000`

### 백엔드

```bash
cd backend
npm install
cp .env.example .env  # 또는 직접 .env 파일 생성
node index.js
```

- 기본 실행 주소: `http://localhost:5000`

---

## 환경 변수 설정 (.env)

`.env.example` 파일을 참고하여 `.env` 파일을 생성하세요.

```dotenv
# 서버가 실행될 포트 번호입니다. 일반적으로 5000번을 많이 씁니다.
PORT=5000

# Azure MySQL 설정
# Azure에서 생성한 MySQL 서버의 호스트명 (예: <서버이름>.mysql.database.azure.com)
DB_HOST=myongjimon.mysql.database.azure.com

# Azure의 기본 포트입니다.
DB_PORT=3306

# Azure MySQL 접속용 사용자 계정 (보통은 `<사용자>@<서버이름>` 형태로 작성해야 함)
DB_USER=youruser@myongjimon

# 사용자의 비밀번호 (Azure MySQL 만들 때 설정한 값)
DB_PASS=yourStrongPassword!

# 실제로 만든 데이터베이스 이름
DB_NAME=myongjimon

```

---

## 팀원 협업 가이드

- **작업 흐름**:
  1. `main` 브랜치에서 새로운 기능 브랜치 생성
  2. 작업 후 커밋 및 푸시
  3. Pull Request 생성하여 코드 리뷰 요청
  4. 리뷰 후 `main` 브랜치에 병합

---

## 프론트엔드 폴더 구조 및 개발 가이드

```
frontend/
├── src/
│   ├── pages/         # 각 페이지별 폴더 (예: Login, Main 등)
│   │   ├── Login/     # 로그인 페이지 관련 파일
│   │   │   ├── Login.js
│   │   │   └── Login.css
│   │   └── Main/      # 메인(홈) 페이지 관련 파일
│   │       ├── Main.js
│   │       └── Main.css
│   ├── components/    # 재사용 가능한 컴포넌트 (버튼, 입력창, 헤더 등)
│   │   ├── Button.js
│   │   ├── Input.js
│   │   └── Header.js
│   └── ...            # 기타 설정 및 공통 파일
```

### 개발 규칙
- **pages/**: 각 화면(페이지)별로 폴더를 만들고, 그 안에 JS와 CSS 파일을 넣어 관리합니다.
- **components/**: 여러 페이지에서 쓸 수 있는 버튼, 입력창, 헤더 등 재사용 가능한 컴포넌트만 모아둡니다.
- 컴포넌트/페이지를 만들 때는 주석을 달아, 역할이 명확하게 보이도록 합니다.
- import 시 상대경로를 사용합니다.

### 예시
```js
// 버튼을 사용하고 싶을 때
import Button from '../components/Button';

// 로그인 페이지에서 Input 컴포넌트 사용 예시
import Input from '../../components/Input';
```

### 협업 팁
- 새로운 페이지나 컴포넌트가 필요하면, 반드시 해당 폴더에 파일을 추가하고, 역할을 주석으로 설명해 주세요.
- 코드 수정 시, 변경 내용을 커밋 메시지에 명확히 남겨주세요.
