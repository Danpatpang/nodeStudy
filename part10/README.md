# 웹 API 서버
API 서버는 FE와 BE가 분리되어 운영되므로 모바일 서버로도 사용하기 좋다.  
특히, JWT 토큰은 모바일 앱과 노드 서버 간에 사용자 인증을 구현할 때 사용된다.

### API 서버
API(Application Programming Interface)는
다른 애플리케이션에서 현재 프로그램의 기능을 사용할 수 있게 허용하는 접점을 의미한다.  
API와 웹 API 서버의 차이
- 웹 API : 다른 웹 서비스의 기능을 사용하거나 자원을 가져올 수 있는 통로.

즉, 서버에 API를 올려서 URL을 통해 접근할 수 있게 만든 것을 웹 API 서버라고 한다.

#### 크롤링
- 정의

표면적으로 보이는 웹 사이트의 정보를 일정 주기로 수집해 자체적으로 가공하는 기술로
웹 사이트가 자체적으로 제공하는 API가 없거나, 이용에 제한이 있을 때 사용하는 방법이다.  
  

- 단점

웹 사이트에서 직접 제공하는 API가 아니므로 원하는 정보를 얻기 힘들다.  
웹 사이트에서 제공하기를 원치 않는 정보를 수집 시 법적 문제가 발생한다.  
*주기적으로 크롤링을 하면 웹 서버의 트래픽을 증가시켜 서버에 무리를 준다.*

> 공개해도 되는 정보들은 API로 만들어 API를 통해 가져가게 하는 것이 좋다.

### 프로젝트 구조

![](https://github.com/Danpatpang/nodeStudy/blob/master/part10/structure.png?raw=true)

클라이언트는 가입, 게시글을 작성하며 게시글, 해시태그, 사용자 정보 등을 JSON 형식으로 API를 통해 받아온다.

- domain 모델 정의

```javascript
{
    validate: {
        unknownType() {
            console.log(this.type, this.type !== 'free', this.type !== 'premium');
            if (this.type !== 'free' && this.type !== 'premium') {
                throw new Error('type이 free 또는 premium이어야 함.');
            }
        }
    },
    timestamps: true,
    paranoid: true
}
```

> validate는 데이터를 추가로 검증하는 속성이다.

`uuid(universally unique identifier)` : 범용 고유 식별자로 고유한 문자열을 만들고 싶을 때 사용.
완벽하게 고유하지는 않지만 실제 사용 시 중복될 가능성은 거의 없다.  

응답을 하는 곳과 도메인이 다르면 CORS(Cross-Origin Resource Sharing) 에러가 발생할 수 있다.
다음의 문제를 해결하기 위해서 미리 허용할 도메인을 등록하는 것이 좋다.
단, 서버에서 서버로 요청을 보내는 경우에는 CORS 묹제가 발생하지 않는다.

### JWT

### 호출서버

### API 서버

### 사용량 제한

### CORS 이해하기