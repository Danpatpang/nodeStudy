# npm

___

### npm
npm(Node Package Management)은 Node의 오픈 소스의 생태계라고 볼 수 있다.
2018년 5월 기준 약 60만 개의 패키지가 등록되어 있으며 노드를 사용하여 프로그램을 개발할 때 많은 도움을 준다.
npm에 업로드된 노드 모듈을 패키지라고 하며, 모듈은 다른 모듈을 사용할 수 있다.
이를 *의존관계*라고 한다.

### package.json
프로젝트를 진행할수록 추가되는 패키지가 많아지게 된다.
이 때 프로젝트에 사용된 패키지의 버전을 관리해주는 것이 package.json 파일이다.  

> 프로젝트를 시작하기 전에 package.json 파일을 만들고 시작하는 것을 추천

`npm init`을 입력하면 package.json 파일을 생성할 수 있다.
생성된 내부의 모습은 다음과 같다.

```json
{
  "name": "part5",
  "version": "1.0.0",
  "description": "npm(Node Package Management)",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "Danpatpang",
  "license": "ISC"
  }
```

`scripts` 부분은 npm 명령어를 저장해두는 곳으로 `npm run [사용자 명령어]` 입력 시 해당 명령어의 코드가 실행된다.  
`npm install [package name]` 또는 `npm install [package name1] [package name2]`을 입력하면 해당 이름의 패키지가 설치된다.
설치 후 package.json 파일에 들어가보면 dependencies라는 속성에 해당 패키지의 이름과 설치 버전이 입력되어 있다.

```json
{
  "name": "part5",
  "version": "1.0.0",
  "description": "npm(Node Package Management)",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "Danpatpang",
  "license": "ISC",
  "dependencies": {
    "express": "^4.16.3"
  }
}
```

추가로 설치된 `node_modules`와 `package-lock.json` 파일이 있는데 
`package-lock.json`에서는 직접 설치한 express 외에도 `node_modules`에 추가로 설치된 모듈의 정보를 담고 있다.  

개발용 패키지는 `npm install -D [package name]`, 전역 패키지는 `npm install -g [package name]`으로 설치할 수 있다.
개발용은 개발 중에만 사용되고 배포시에는 제외되며 package.json에서 devDependencies라는 속성에 따로 보관된다.  

개발을 하다보면 수많은 패키지가 추가되게 되고 프로젝트 파일의 크기는 커지게 된다.
이러한 문제는 버전 관리 시스템을 이용 시 프로젝트 관리에 악 영향을 미친다.
그래서 개발 코드와 package.json 파일만 커밋하는 것이 일반적이다.

### 패키지 버전 이해하기
노드의 패키지의 버전은 하상 세 자리로 유지한다.
각각의 패키지는 모두 버전이 다르고 의존 관계가 복잡하므로 버전 관리에 있어서 신중해야한다.

#### major.minor.patch
major가 `0`일 경우 초기 개발 중, `1`부터는 정식 버전을 뜻한다.
major 버전은 하위 호환이 안 될 정도로 많은 내용이 수정되므로 업데이트 시 에러의 가능성이 크다.  
minor는 업데이트 시 하위 호환이 가능해야 한다.  
patch는 새로운 기능보다는 간단한 버그 수정 시 수정한다.

> 새 버전을 배포한 후에는 그 버전의 내용을 절대 수정하면 안 되며, 수정을 원할 시 버전의 업데이트를 통해 수정해야 한다.  
> `^`는 minor 버전까지만 설치, 업데이트가 가능하다.  
> `~`는 patch 버전까지만 설치, 업데이트가 가능하다.

### 기타 명령어
+ `npm outdated` : 업데이트할 수 있는 패키지 확인.
+ `npm update [package name]` : 해당 이름의 패키지 업데이트.
+ `npm uninstall [package name]` : 해당 이름의 패키지 제거.
+ `npm search [keywords]` : npm의 패키지를 검색.
+ `npm info [package name]` : 패키지의 세부 정보 파악.
+ `npm adduser` : npm 로그인.
+ `npm whoami` : 현재 npm 사용자 확인.
+ `npm logout` : npm 로그아웃.
+ `npm publish` : 패키지 배포.
+ `npm unpublish` : 배포된 패키지 제거.

> npm에 패키지 배포 후 24시간이 지나면 삭제 불가.  
> 배포 시 개인 정보 포함을 주의하고 의미없는 패키지를 배포하지 말 것.

### 서버 개발에 추가로 자주 사용되는 패키지
+ `nodemon` : 소스 코드 변경 시 자동으로 서버 재실행.
+ `rimraf` : 지정 파일, 디렉토리 삭제.
+ `morgan` : Express로 요청이 오면 로그를 남겨줌.
+ `cookie-parser` : 쿠키 구문 분석.
+ `express-session` : Express 프레임워크에서 세션을 관리.
___