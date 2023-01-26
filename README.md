# Express server boilerplate

## ❓왜 만들게 되었나?

초기 구축마다 똑같은 구조와 라이브러리로 반복 작업을 하는 것이 지겨웠어요.
저만의 보일러플레이트를 만들어서 단순 작업들을 없애기 위해 만들었어요. :)

## ⚒기술 스택

<img src="https://img.shields.io/badge/Typescript-blue?style=flat&logo=typescript&logoColor=white"/> <img src="https://img.shields.io/badge/Express-green?style=flat&logo=express&logoColor=white"/> <img src="https://img.shields.io/badge/Nodemon-yellow?style=flat&logo=nodemon&logoColor=white"/> <img src="https://img.shields.io/badge/Jest-orange?style=flat&logo=jest&logoColor=white"/> <img src="https://img.shields.io/badge/Prettier-purple?style=flat&logo=prettier&logoColor=white"/> <img src="https://img.shields.io/badge/ESLint-orange?style=flat&logo=eslint&logoColor=white"/> <img src="https://img.shields.io/badge/NPM-yellow?style=flat&logo=npm&logoColor=white"/>

## 😯어떻게 쓰나요?

### 설치 및 설정하기

```bash
# 로컬로 다운받기
$ git clone https://github.com/gingaminga/express-server-bolierplate.git

# 다운받은 경로로 이동
$ cd express-server-bolierplate

# 라이브러리 설치
$ npm install
```

**끝입니다!**

### 사용하기

아래 명령어들로 프로젝트를 사용할 수 있어요.

```bash
# 개발 시 nodemon으로 동작
$ npm run dev

# typescript to javascript (transpile)
$ npm run build

# Test 하기
$ npm run test

# src 하위 폴더 eslint 검사
$ npm run eslint

# src 하위 폴더 eslint 검사 및 자동 고치기
$ npm run eslint:fix

# src 하위 폴더 자동 코드 포맷팅
$ npm run prettier:write
```

> 자세한 내용은 [package.json](https://github.com/gingaminga/express-server-bolierplate/blob/main/package.json)의 `script`를 확인하세요. :)

### .env 설정

.env 파일이 없어도 문제없이 동작해요.
하지만 특정 값들은 따로 설정할 수 있도록 했어요. :)

```bash
# .env 파일 생성 및 작성하기
$ vi .env
```

> .env 구성에 관한 설명은 [.env.sample](https://github.com/gingaminga/express-server-bolierplate/blob/main/.env.sample) 파일을 확인하세요 :)

## 📁폴더 및 파일 설명

- `dist` : `src`폴더를 기준으로 트랜스파일링하여 javascript로 빌드된 폴더(`tsconfig.json`에서 변경 가능)
- `logs` : `.env` 파일로 설정하지 않았다면 생기는 폴더로, winston을 사용한 log를 쌓음
- `src` : 실제 서비스에 대한 코드가 들어있는 폴더
  - `routers` : 실제 API와 관련된 로직이 들어있는 폴더
  - `middlewares` : 공통 미들웨어 로직이 들어있는 폴더
  - `test` : 테스트 로직 폴더
  - `types` : 커스텀 타입을 설정하는 폴더
  - `utils` : 각종 유틸들
  - `app.ts` : express 설정의 root 부분
  - `index.ts` : 해당 프로젝트의 root 부분

## 👍 자신의 프로젝트로 사용하기

git remote 를 변경하거나 삭제하면 돼요. :)

```bash
# 원격지 확인
$ git remote -v
# origin  https://github.com/gingaminga/express-server-bolierplate.git (fetch)
# origin  https://github.com/gingaminga/express-server-bolierplate.git (push)

# 기존 원격지 삭제
$ git remote rm origin

# 자신의 레포지토리를 원격지로 설정
$ git remote add origin [자신의 레포지토리 주소]
```

(해당 보일러플레이트를 사용하고 있는 상태에서) 업데이트된 소스를 반영받고 싶다면 `merge or rebase`를 통해 반영하면 돼요. :)

```bash
# 원격지 추가
$ git remote add boilerplate https://github.com/gingaminga/express-server-bolierplate.git

# boilerplate repository 반영사항 가져오기
$ git fetch boilerplate main

# 반영사항을 현재 (자신의) 로컬 브랜치에 합치기
$ git rebase boilerplate/main
# or
$ git merge boilerplate/main
```
