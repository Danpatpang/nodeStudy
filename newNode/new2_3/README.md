### 스캐폴딩
템플릿을 만들어 놓고 새 프로젝트를 시작할 때마다 템플릿을 복사하는 방법.

package.json에 저장소 URL을 지정하지 않거나 README.md 파일을 작성하지 않으면
npm 실행 시마다 경고가 발생한다.

`app.set('port', process.env.PORT||3000);`
> 서버를 시작하기 전에 환경 값을 설정해 포트를 오버라이드함.

`app.get()`
> 라우트를 추가하는 메서드. (매개변수로 경로와 함수를 받음)

경로 매개변수는 대소문자, 맨 뒤의 슬래시를 무시.

매칭할 때는 쿼리스트링을 무시한 채 매칭된다.

`app.get('/about')`은 `/about`, `/About`, `/about/`, `/about?a=1`, `/about/?a=1`등에 모두 동작한다.

> res.end()는 res.send를 사용.
>
> res.writeHead()는 res.set(), res.status()를 사용.
>
> Content-Type은 res.type()을 사용.

`app.use()`
> 미들웨어를 추가할 때 쓰는 메서드. (폴백 핸들러)

#### 익스프레스에서 라우트와 미들웨어를 추가하는 순서가 중요하다.
```javascript
// 와일드카드
app.get('/about*', (req, res) => {
    // code
});

// 작동 X
app.get('/about/contact', (req, res) => {
    // code
});

// 작동 X
app.get('/about/directions', (req, res) => {
    // code
});
```

### 뷰와 레이아웃
뷰는 정적일 필요가 없으므로 각 요청에 맞는 HTML을 즉석으로 만들어 커스텀 페이지를 제공할 수 있다.

웹 사이트를 만들다 보면 반복되는 코드가 페이지마다 등장한다.

해당 코드들은 유지보수에서 단점이 되므로 레이아웃을 사용하여 보완한다.

#### 정적 파일
`app.use(express.static());` 

static 미들웨어는 정적 자원을 담고 있는 하나 이상의 디렉터리를 지목해서
특별한 처리 없이 클라이언트에 전송할 수 있게 해준다.

라우트를 선언하기 전에 추가할 것.

#### 동적 컨텐츠 뷰