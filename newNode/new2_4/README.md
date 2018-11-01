# 모양새 갖추기

### 버전 관리
1. 문서 : 어떤 결정을 내렸는가, 개발한 순서는 어떻게 되었는가.
2. 귀속 : 누가 무엇을 담당했는가.
3. 실험 : 성공적이면 반영, 실패라면 폐기.

### Git
`git --version` : 설치된 git의 버전 확인.

`git init` : 프로젝트 디렉터리에 깃 저장소 생성.

`.gitignore` : 깃에서 기본적으로 무시할 파일이나 디렉터리를 관리.
서브디렉토리에 들어있는 항목도 포함된다.

`git add -A` : 깃에 모든 파일의 수정 내역을 추가.

`git add [file]` : 깃에 file의 수정 내역을 추가.

`git commit -m "message"` : staging 영역에 보관되던 파일을 "message"와 함께 커밋.

`git clone [project_address]` : 저장소에 위치한 프로젝트를 가져옴.

`git checkout -b [branch]` : 브랜치를 만들고 체크아웃.

> `git add`는 파일이 아니라 바뀐 점을 추가한다.

### npm
`npm init` : package.json 생성

`package.json` 파일의 목적은 프로젝트를 설명하고 의존성 목록을 만드는 것.

`node_modules` 디렉터리는 package.json의 일종의 부산물.
해당 디렉터리를 지우더라도 `npm install`을 사용하면 디렉터리가 생기고 필요한 모듈들을 모두 다운로드한다.

```javascript
// ./lib/fortune
var fortuneCookies = ["1", "2", "3", "4"];

exports.getFortune = () => {
    var random = Math.floor(Math.random() * fortuneCookies.length);
    return fortuneCookies[random];
}

// other
var fortune = require('./lib/fortune');

var randomCookie = fortune.getFortune();
```

> `require()`은 모듈을 가져오는 함수.
>
> 기본적으로 노드는 node_modules 디렉터리에서 찾는다.
>
> 사용자 모듈을 만들 때는 전역 변수 exports에 저장해 줄 것.