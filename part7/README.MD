# MySQL

서버가 종료되면 메모리가 정리되면서 저장했던 데이터도 사라져 버린다.
이를 방지하기 위해서는 데이터베이스를 사용해야 한다.
+ 관계형 데이터베이스 : MySQL
+ NoSQL 데이터베이스 : MongoDB
___

### 데이터베이스란?
관련성을 가지며 중복이 없는 데이터들의 집합. 데이터베이스를 관리하는 시스템을 DBMS라고 부른다.
데이터베이스는 저장 매체가 고장나거나 사용자가 직접 데이터를 지우지 않는 이상 계속 데이터가 보존된다.
여러 사람이 동시에 사용할 수 있으며, 각 사용자마다 다른 권한을 주어 다양한 작업을 수행할 수 있다.

### 명령어
+ `mysql -h [access address] -u [username] -p` : 입력한 주소를 username으로 접속.
+ `CREATE SCHEMA [database name]` : 데이터베이스 생성.
+ `use [database name]` : 해당 데이터 베이스 사용.
+ `CREATE TABLE [table name]` : 테이블 생성.
    + `INT` : 정수 타입, `FLOAT`, `DOUBLE`로 소수 표현 가능.
    + `VARCHAR, CHAR` : 가변 길이의 문자열 타입, 고정 길이 문자열 타입.
    + `TEXT` : 몇백 자 이내의 문자열은 VARCHAR, 그 이상은 TEXT로 처리.
    + `TINYINT` : -127 ~ 127, boolean 역할의 타입.
    + `DATETIME` : 날짜와 시간에 대한 타입.
    + `NULL, NOT NULL` : 빈 칸을 허용할지 여부를 묻는 옵션.
    + `AUTO_INCREMENT` : 입력이 없어도 자동으로 증가된 숫자 입력.
    + `UNSIGNED` : 음수를 무시하는 숫자 자료형의 옵션.
    + `ZEROFILL` : 빈 공간을 0으로 채우는 옵션.
    + `DEFAULT now()` : 입력이 없으면 현재 시각을 입력. `CURRENT_TIMESTAMP`와 동일.
    + `PRIMARY KEY` : 프라이머리 키로 설정.
    + `UNIQUE INDEX` : 해당 값이 고유해야 하는지에 대한 옵션.
    + `COMMENT` : 테이블에 대한 보충 설명.
    + `DEFAULT CHARSET` : 기본 CHARSET 설정.
    + `CONSTRAINT [constraint name] FOREIGN KEY[FK_column] REFERENCES [PK_column]` : PK-FK 제약 조건 설정.
```
CREATE TABLE users(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(20) NOT NULL,
    age INT UNSIGNED NOT NULL,
    married TINYINT NOT NULL,
    comment TEXT NULL,
    created_at DATETIME NOT NULL DEFAULT now(),
    PRIMARY KEY(id),
    UNIQUE INDEX name_UNIQUE (name ASC))
    COMMENT = "사용자 정보"
    DEFAULT CHARSET = utf8
    ENGINE = InnoDB;
```
+ `DESC [talbe name]` : 테이블의 스키마 조회
+ `DROP TABLE [table name]` : 테이블 삭제
+ `SHOW TABLES` : 데이터베이스 내의 생성된 테이블 조회

> MySQL에서 데이터베이스와 스키마는 같은 개념이다.  
> SQL 구문을 입력할 시 마지막에 세미콜론을 붙여야 실행이 된다.  
> 예약어는 소문자로 써도 되지만, 사용자 정의 이름과 구분하기 위해 대문자로 쓰는 것이 좋다.

### CRUD

#### CREATE
데이터를 생성해서 데이터베이스에 넣는 작업.
```
INSERT INTO [table] (column1, column2, ...) VALUES (value1, value2, ...);
```

#### READ
```
SELECT * FROM [table];
SELECT (column1, column2, ...) FROM [table];
SELECT * FROM [table] WHERE [조건문];
SELECT * FROM [table] ORDER BY [column] [ASC | DESC];
SELECT * FROM [table] LIMIT 1;
SELECT * FROM [table] ORDER BY [column] LIMIT 1 OFFSET 3;
```

> ASC : 오름차순, DESC : 내림차순  
> ORDER BY 사용 후 옵션 입력이 없다면 ASC가 기본 설정.  
> LIMIT 1은 1개의 데이터만 출력.
> OFFSET 3은 조회된 데이터 3개를 띄어넘음.

```
SELECT * FROM todo ORDER BY id LIMIT 3, OFFSET 2;
SELECT * FROM todo ORDER BY id LIMIT 2, 3;
```
> 위의 두 문장은 동일하다.  
> todo 테이블을 id순으로 정렬한 데이터의 3, 4, 5번만 조회한다.

#### UPDATE
```
UPDATE [table] SET [selected_column = new_value] WEHRE [조건문];
```

#### DELETE
```
DELETE FORM [table] WHERE [조건문];
```

### Sequelize (시퀄라이즈)
Node에서 MySQL 데이터베이스에 접속하는 것을 도와주는 라이브러리.
자바스크립트 구문을 알아서 SQL 구문으로 바꿔주므로 직접 SQL 문을 사용하지 않아도 MySQL을 조작할 수 있다.  
ORM(Object-relational Mapping) : 자바스크립트 객체와 데이터베이스의 관계를 매핑.  
```
npm i sequelize mysql2
npm i -g sequelize-cli
sequelize init
```
`sequelize init` 실행 시 config, models, migrations, seeders 폴더 생성.
1. models/index.js 수정
2. app.js 연동
3. config/config.json 수정

#### 모델 정의
MySQL에서 정의한 테이블을 시퀄라이즈에서도 정의해야 한다.
MySQL의 테이블은 시퀄라이즈의 모델과 대응된다.
시퀄라이즈는 모델과 MySQL의 테이블을 연결해주는 역할을 한다.
시퀄라이지는 기본적으로 모델 이름은 단수형, 테이블 이름은 복수형을 사용한다.


```
// MySQL
CREATE TABLE users(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(20) NOT NULL,
    age INT UNSIGNED NOT NULL,
    married TINYINT NOT NULL,
    comment TEXT NULL,
    created_at DATETIME NOT NULL DEFAULT now(),
    PRIMARY KEY(id),
    UNIQUE INDEX name_UNIQUE (name ASC))

// javascript
// user.js
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('user', {
        name: {
            type: DataTypes.STRING(20),
            allowNUll: false,
            unique: true,
        },
        age: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNUll: false,
        },
        married: {
            type: DataTypes.BOOLEAN,
            allowNUll: false,
        },
        comment: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.literal('now()'),
        },
    }, {timestamps: false});
};
```
시퀄라이즈는 알아서 id를 기본 키로 연결하므로 적어줄 필요가 없다.
`sequelize.define` 메서드로 테이블명과 각 컬럼의 스펙을 입력할 수 있다.
모델은 MySQL 테이블과 컬럼 내용이 일치해야 정확하게 대응된다.
> VARCHAR => STRING  
> INT => INTEGER  
> TINYINT => BOOLEAN
> DATETIME => DATE  
> INT UNSIGNED => INTEGER.UNSIGNED  
> ZEROFILL => INTEGER.UNSIGNED.ZEROFILL  
> NOT NULL => allowNull : false  
> DEFAULT now() => defaultValue : sequelize.literal('now()')  
> timestamps가 true이면 createdAt, updatedAt 컬럼이 자동으로 추가.  
> (현재는 created_at 컬럼이 있으므로 timestamps 불필요)

```javascript
// comment.js
module.exports = (sequelize, DateTypes) => {
    return sequelize.define('comment', {
        comment : {
            type: DateTypes.STRING(100),
            allowNUll: false,
        },
        created_at : {
            type: DateTypes.DATE,
            allowNull: false,
            defaultValue : sequelize.literal('now()'),
        }
    }, {timestamps : false});
};
```
commenter 컬럼이 없는 것을 볼 수 있는데 모델을 정의할 때 넣어줘도 되지만, 시퀄라이즈 자체에서 관계를 따로 정의할 수 있다. 

```javascript
// model/index.js
    db.sequelize = sequelize;
    db.Sequelize = Sequelize;
    // 시퀄라이즈 관계 연결
    db.User = require("./user")(sequelize, Sequelize);
    db.Comment = require("./comment")(sequelize, Sequelize);
```

#### 관계 정의
1. 1:N 관계(hasMany, belongsTo)
+ User → Comment (hasMany)  
+ User ← Comment (belongsTo)
```javascript
//app.js
db.User.hasMany(db.Comment, {foreignKey : 'commenter', sourceKey : 'id'});
db.Comment.belongsTo(db.User, {foriegnKey : 'commenter', targetKey : 'id'});
```

2. 1:1 관계(hasOne, belongsTo)
+ User → Info (hasOne)  
+ User ← Info (belongsTo)
```javascript
db.User.hasOne(db.Info, {foreignKey: 'uesr_id', sourceKey:'id'});
db.Info.belongsTo(db.User, {foriegnKey:'user_id', sourceKey:'id'});
```
3. M:N 관계(belongsToMany)
+ User → Comment (hasMany)  
+ User ← Comment (belongsTo)
```javascript
db.Post.belongsToMany(db.Hashtag, {through : 'PostHashing'});
db.Hashtag.belongsToMany(db.Post, {through : 'PostHashing'});
```

#### 쿼리
쿼리는 Promise를 반환하므로 then을 붙여 결과값을 받을 수 있다.
async/await 문법을 사용해도 무관하다.

```javascript
// 데이터 삽입
// Insert INTO nodejs.users (name, age, married, comment) VALUES ('zero', 24, 0, '자기소개1');
const User = require('../models');
User.create({
    name : 'zero',
    age : 24,
    married : false,
    comment: '자기소개1',
});

// 데이터 조회
// SELECT * FROM nodejs.users;
User.findAll({});

// SELECT * FROM nodejs.users LIMIT 1;
User.find({});

// SELECT * FROM nodejs.users LIMIT 1 OFFSET 1;
User.findAll({
    limit : 1,
    offset : 1,
});

// SELECT name, married FROM nodejs.users;
User.findAll({
    attributes: ['name', 'married'],
});

// SELECT name, age FROM nodejs.users WHERE married = 1 AND age > 30;
const {User, Sequelize: {Op}} = require('../models');
User.findAll({
    attributes : ['name', 'age'],
    where : {
        married : 1,
        age : {[Op.gt] : 30},
    }
});

// SELECT id, name FROM nodejs.users WHERE married = 0 OR age > 30;
const {User, Sequelize: {Op}} = require('../models');
User.findAll({
    attributes : ['id', 'name'],
    where : {
        [Op.or] : [{married : 0}, {age : {[Op.gt] : 30}}],
    },
});

// SELECT id, name FROM nodejs.users ORDER BY age DESC;
User.findAll({
    attributes : ['id', 'name'],
    order : [['age', 'DESC']],
});

// 데이터 수정
// UPDATE nodejs.users SET comment = '바꿀 내용' WHERE id = 2;
User.update({
    comment : '바꿀 내용',
    where : { id : 2 }
});

// 데이터 삭제
// DELETE FROM nodejs.users WHERE id = 2;
User.destroy({
    where : { id : 2 }
});
```
> 데이터를 넣을 때 MySQL의 자료형이 아닌 Sequelize 모델의 자료형으로 넣는다.

___
#### 설치 모듈
+ `npm i sequelize`
+ `npm i mysql2`
+ `npm i -g sequelize-cli`