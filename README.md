# 🗓️ 캘린더 웹 사이트 제작 프로젝트

https://wonseungteamproject-smartday.netlify.app/

## 📖 프로젝트 소개 

업무의 효율을 높여주는 **시간 관리 서비스**입니다. 아래의 기능들을 중점적으로 제작했습니다. 

- TODO 리스트 관리
- 월별 일정 관리
- 단기 예보 API를 활용한 현재 날짜 기준 3일치 날씨 정보 제공

<br/>
  
## 🤝 팀 소개

프로그래머스 데브코스 웹 풀 사이클 3기 **완승팀**입니다.

### 멘토

- **유승완**

### 프론트엔드 (FE)

| 역할 | 이름 | 담당 업무 |
| --- | --- | --- |
| 팀장 | [이진성](https://github.com/JSLEE753) | Todolist 페이지<br>전체 모달 구현<br>전역 데이터 구현<br>단기 예보 API 연동 |
| 팀원 | [이도형](https://github.com/leedohyung28) | 공통 컴포넌트 및 모달 구현<br>페이지 구현<br>로그인 구현 |
| 팀원 | [신유정](https://github.com/II-122) | 메인 페이지 구현<br>캘린더 페이지 구현<br>라우팅 기능 구현<br>단기 예보 API 적용 |

### 백엔드 (BE)

| 역할 | 이름 | 담당 업무 |
| --- | --- | --- |
| 팀원 | [양유나](https://github.com/una3325) | Schedules API 구현 |
| 팀원 | [이민형](https://github.com/leemh98) | Users API 구현<br>Favorites API 구현 |
| 팀원 | [최효은](https://github.com/hyoeun0001) | Todos API 구현<br>서버 배포 |

<br/>
 
## 📦 프로젝트 폴더 구조

### client (FrontEnd)

```less
📂src
 ┣ 📂apis              // 백엔드 서버에 요청할 API 파일들을 모아놓은 폴더
 ┣ 📂components        // 모달에 사용되는 컴포넌트와 공통 페이지에 사용되는 컴포넌트 관리
 ┃ ┣ 📂ModalComponents
 ┃ ┗ 📂PageComponents
 ┣ 📂pages             // 핵심 페이지들의 컴포넌트 관리
 ┃ ┣ 📂MainPage
 ┃ ┣ 📂SchedulePage
 ┃ ┗ 📂TodolistPage
 ┣ 📂routes            // 상단의 헤더를 통해 페이지를 이동할 수 있도록 라우트 기능 관리
 ┃ ┗ 📜MainRoutes.tsx
 ┣ 📂store             // 전역 state 파일들을 관리
 ┣ 📜App.css.ts
 ┣ 📜App.tsx
 ┣ 📜index.css
 ┗ 📜main.tsx

```


### server (BackEnd)

```arduino
┣ 📂controller          // 컨트롤러 파일
┣ 📂models              // SQL 함수 관리 폴더
┣ 📂node_modules
┣ 📂routes              // 경로 관리
┣ 📜.env
┣ 📜.gitignore
┣ 📜.prettierrc
┣ 📜app.js
┣ 📜auth.js
┣ 📜eslint.config.mjs
┗ 📜mariadb.js

```

<br/>

## ⏰ 개발 기간
**24.06.22 ~ 24.07.22**<br>
![image](https://github.com/user-attachments/assets/538431dc-5c2b-45d8-a6d1-ada44df334e7)

<br/>

## 🛠 개발 도구

### FrontEnd
<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white"> <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white"> <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=Vite&logoColor=white"> <img src="https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=Redux&logoColor=white"> <img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=Axios&logoColor=white"> 

### BackEnd
<img src="https://img.shields.io/badge/Node.js-5FA04E?style=for-the-badge&logo=Node.js&logoColor=white"> <img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=Express&logoColor=white"> <img src="https://img.shields.io/badge/MariaDB-003545?style=for-the-badge&logo=MariaDB&logoColor=white"> <img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=MySQL&logoColor=white"> <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON Web Tokens&logoColor=white"> 

### Deploy
<img src="https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=Netlify&logoColor=white"> <img src="https://img.shields.io/badge/Cloudtype-000000?style=for-the-badge&logo&logoColor=white">

<br/>

## 🗺 프로젝트 설계도

### FrontEnd 초기 Figman 설계도
![image](https://github.com/user-attachments/assets/66f90266-8726-4ea1-acad-8183f88ab627)

### BackEnd 테이블
![image](https://github.com/user-attachments/assets/9d5b0b97-57f2-43fd-a33e-869138b1cc72)

<br/>

## 🔥 나의 역할 및 개발 과정 중 문제가 생겼던 점과 해결책
### 역할
공통 컴포넌트 및 모달 일부 구현<br>일부 페이지 구현<br>Login, Header, Footer 구현

### 어려웠던 점
<br>

**1. 페이지가 나타날 때 (렌더링될 때) 불필요하게 `useEffect`가 실행되는 경우**<br><br>
→ `hasPageBeenRendered`라는 `useRef({ effect: false })`를 만들어서,<br>
  해당 변수가 `false`라면 처음 페이지가 나타날 때도 불필요하게 실행되므로, `useEffect`에서 실행되는 함수를 실행하지 않고 `hasPageBeenRendered`를 `true`로 바꿔줍니다.<br>
  하지만 변수가 `true`이면 처음 페이지가 렌더링되는 것이 아닌 다른 상황이므로 의도대로 함수를 실행해줍니다.<br>
  (참고 : https://dpericich.medium.com/how-to-bypass-useeffect-on-your-first-page-render-c31b7ba112a7 )
<br><br>

**2. `.css.ts` 파일이 적용되지 않는 경우**<br><br>
→ `vite.config.ts` 파일에 `vanillaExtractPlugin()`를 `plugins`의 추가하여 `.css.ts`를 파일에 적용가능하도록 합니다.
<br><br>

**3. Router를 통해 여러 페이지를 이동하여도 같은 데이터 (일정, Todo, 위치 등..)이 유지되어야 해야하는 것**<br><br>
→ `Redux`를 사용하여 전역 데이터를 선언하였고, 데이터를 저장/불러오기 할 때마다 API를 연결하여<br>
   불러온 데이터를 전역 데이터에 저장하여 사용자에게 보여주고,<br>
   새롭게 저장/수정할 데이터를 API를 통해 Database에 보내주면서 전역 데이터에 추가하며 API를 통해 전체 데이터를 새롭게 불러오지는 않았습니다.
<br><br>

## 💡 느낀점
- 프로젝트를 진행하면서 BE/FE로 나누며 Git을 사용하며 브랜치와 버전 관리의 중요성을 깨달았습니다.
- API와 DB와 연결할 때 BE와 소통을 하면서 협업 중 문제가 발생했을 때 대처하며 얻은 경험을 통해 문제 상황에 유연하게 대처할 수 있습니다.
- FE, BE, DB를 배포하고 연결하며 만든 프로젝트를 `localhost`가 아닌 실제 서버에 올릴 수 있게 되었습니다.
- FE 파트에 참여하면서 React에서 폴더 구조와 전역 스타일 관리에 대한 지식을 얻었습니다.

