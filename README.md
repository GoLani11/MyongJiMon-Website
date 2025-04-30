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
PORT=5000

DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASS=yourpassword
DB_NAME=myongjimon
```

---

## 팀원 협업 가이드

- **작업 흐름**:
  1. `main` 브랜치에서 새로운 기능 브랜치 생성
  2. 작업 후 커밋 및 푸시
  3. Pull Request 생성하여 코드 리뷰 요청
  4. 리뷰 후 `main` 브랜치에 병합
