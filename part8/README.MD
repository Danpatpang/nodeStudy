# MongoDB

서버가 종료되면 메모리가 정리되면서 저장했던 데이터도 사라져 버린다.
이를 방지하기 위해서는 데이터베이스를 사용해야 한다.
+ 관계형 데이터베이스 : MySQL
+ NoSQL 데이터베이스 : MongoDB
___

### mongoDB

자바스크립트 문법을 사용하고 RDbMS가 아닌 NoSQL 언어이다.  

*SQL과 NoSQL의 차이점*
1. 자유로운 데이터 입력 가능
2. 용어(컬렉션, 다큐멘트, 필드)
3. 트랜잭션 미지원
4. 확장성, 가용성
5. 컬렉션 간 JOIN 미지원

NoSQL은 고정된 테이블이 없다.
그래서 컬렉션(테이블) 생성 시 어떠한 데이터라도 다 들어갈 수 있다.
또한 JOIN을 흉내낼 수는 있지만, 항상 가능한 것은 아니다.
트랜잭션을 지원하지 않아 데이터 일관성에 문제가 생길 수도 있다.
그럼에도 데이터를 빠르게 넣을 수 있고, 쉽게 분산할 수 있는 특징을 가진다.
실무에서는 SQL, NoSQL이 특징에 맞게 동시에 사용된다.

> 비행기 표에 관한 예약 처리 부분 : SQL
> 핵심 기능 외의 빅데이터, 메시징, 세션 관리 : NoSQL

### 실행
1. 데이터가 저장될 폴더 생성(C:\data\db)
2. mongoDB 설치 위치에서 서버 실행 (`mongod`)
3. mongoDB 프롬프트 실행(`mongo`)
4. 관리자 계정 추가
(`use admin`, `db.createUser({user: '이름', pwd:'비밀번호', roles:['root']})`)
5. 서버 재 실행(`mongod --auth`)
6. 계정 접속(`mongo admin -u 이름 -p 비밀번호`)

### 명령어
+ `use 데이터베이스` : 데이터베이스 생성
+ `show dbs` : 데이터베이스 목록 확인
+ `db` : 현재 사용중인 데이터베이스 확인
+ `db.createCollection('collection_name')` : 콜렉션 생성

> 데이터가 최소 한 개 이상 들어있어야 dbs에서 조회 가능.  
> 콜렉션을 생성하지 않아도 다큐먼트를 넣는 순간 자동 생성.  

### CRUD
#### CREATE
컬렉션에 컬럼의 정의하지 않아도 아무 데이터나 넣을 수 있다.
자유로움이 몽고디비의 장점이지만, 어떤 데이터가 들어갈지 모른다는 것이 단점이다.
자료형은 기존 JavaScript의 자료형과 추가적인 자료형을 사용한다.
Undefined, Symbol 자료형은 몽고디비에서 사용 불가능하다.
몽고디비의 추가적인 자료형은 ObjectId, Binary Data, Timestamp 등이 있다.
ObjectId의 경우 MySQL의 primarykey와 성격이 비슷하다.

```javascript
// use nodejs
db.users.save({ name : 'zero', age : 24, married : false, comment : '안녕하세요.', createdAt: new Date()});
db.users.save({ name : 'nero', age : 32, married : true, comment : '안녕.', createdAt: new Date() });

db.comments.save({commenter : ObjectId("5bc4614efbc8684cbcbf17c8"), comment: '안녕하세요요요', createdAt: new Date()});
```
> new Date()는 현재 시간을 입력.  
> ObjectId()는 데이터가 가지고 있는 고유한 id 값.

#### READ
```javascript
// 모든 쿼리 조회
db.users.find({});
db.comments.find({});

// name과 married만 조회
db.users.find({}, {_id:0, name:1, married: 1});

// age가 30초과, married가 true인 name, married 조회
db.users.find({age: {$gt:30}, married: true}, {_id:0, name:1, married: 1});

// age가 30초과이거나 married가 false인 다큐멘트 조회
db.users.find({$or: [{age: {$gt:30} }, {married:false}]}, {_id:0, name:1, married: 1});

// 오름차순으로 조히
db.users.find({}, {_id:0, name:1, age: 1}).sort({age: -1});

// limit 사용
db.users.find({}, {_id:0, name:1, age: 1}).sort({age: -1}).limit(1);
// skip 사용
db.users.find({}, {_id:0, name:1, age: 1}).sort({age: -1}).limit(1).skip(1);
```

> _id는 기본적으로 나오게 되어 있으므로 0 또는 false로 설정해줘야 한다.  
> sort(), limit(), skip()을 사용할 수 있다.  
> sort()에서 *-1은 내림차순, 1은 오름차순* 이다.

#### UPDATE
```javascript
db.users.update({name:'nero'}, {$set : {comment : "잘가세요"}});
```
> 첫 번째 인자는 where 문, 두 번째 인자는 set 문과 같다.  
> $set 연산자를 입력하지 않고 객체를 넣을 시 통째로 수정된다.  
> $set 연산자는 일부 필드만 수정하고 싶을 때 사용한다.

#### DELETE
```javascript
db.users.remove({name:'nero'});
```

### Mongoose
몽구스는 Sequelize와 달리 다큐먼트를 사용하므로 ODM(Object Document Mapping)이라고 한다.
자바스크립트인데도 자바스크립트 객체와 매핑하는 이유는 몽구디비에 없는 불편한 기능들을 보완해주기 때문이다.
`npm i mongoose`로 설치가능하다.

1. 스키마 제공 : 몽고디비에 데이터를 넣기 전 서버에서 데이터를 필터링.
2. JOIN 기능 : populate 메서드를 이용해서 어느정도 보완.

#### 연결
#### 스키마 정의
#### 쿼리 수행

___
#### 설치 모듈
+ `mongoose` : mongoDB에 없는 불편한 기능들을 제공하는 모듈