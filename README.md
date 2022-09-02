# 🔍 뉴욕타임즈 기사 검색 웹 프로젝트

## 🪄 개요

react를 사용하여 뉴욕타임즈 기사를 검색하고, 원하는 뉴스를 클립하는 기능을 구현하는 프로젝트입니다.

## 📚 메인 기술

- <img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white">
- <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
- <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black">

## ✅ 요구사항

### 개발과정

- [ ] 각 작업에 대하여 commit message를 잘 작성하였는가
- [ ] 아무 commit이나 checkout 하여도 빌드에러가 나지 않고 잘 실행되는가
- [ ] api token이 git에 포함되지 않았으며, 쉽게 교체할 수 있는 구조인가
- [ ] 코드가 목적에 따라 적절히 분리되어있는가

### 기본 요구사항 - Routing

- [ ] "/"과 "/clip"에서 navigator(Link 태그 등)를 통해 서로 이동할 수 있는가
- [ ] 유효하지 않은 url에 대한 예외처리가 잘 이루어졌는가
- [ ] 뒤로가기, 앞으로가기, 새로고침 등 브라우저에서의 히스토리 관련 동작이 잘 동작하는가

### 기본 요구사항 - news

- [ ] news 리스트가 잘 렌더되는가
- [ ] 각각의 news 카드는 타이틀, 날짜, clip하기버튼, 자세히 보기 버튼을 포함하는가
- [ ] input에서 enter나 검색 버튼을 누르지 않아도 api를 호출하는가
- [ ] 자세히보기 버튼 클릭 시 해당 기사를 새 탭에서 open 하는가
- [ ] 뉴스를 추가로 불러올 수 있는가 (button을 클릭해서라도)
- [ ] news list는 브라우저를 종료했을 때 잘 초기화되는가
- [ ] news list 렌더 시 최적화를 위한 key가 적절히 작성되어 있는가

### 기본 요구사항 - clip

- [ ] clip 버튼을 클릭하여 clip을 추가하고, "/clip" 페이지에서 확인가능한가
- [ ] clip 버튼과 upclip 버튼이 토글 가능하고, upclip시 "/clip" 페이지에서 삭제되는가
- [ ] clip list는 브라우저를 종료해도 지속되는가

### 기본 요구사항 - search

- [ ] 검색 시 search history가 잘 추가되는가
- [ ] search history가 존재하는 경우만 노출하는가
- [ ] input에 focus중일 때만 search history를 노출하는가
- [ ] search history는 최대 5개까지만 저장되는가
- [ ] search history는 브라우저를 종료해도 지속되는가

### 프로젝트 완성도

- [ ] scroll을 내리는 경우 추가로 뉴스를 불러오는가
- [ ] 화면에 보이지 않는 card는 최적화를 위해 렌더하지 않도록 처리하였는가
- [ ] input 입력 후 0.5초동안 추가입력이 없는 경우에만 api를 호출하는가
- [ ] input value가 있는 경우만 api를 호출하였는가
- [ ] 새 탭에서 외부 url을 open하는 경우, 보안 및 최적화를 위한 attribute를 추가하였는가
