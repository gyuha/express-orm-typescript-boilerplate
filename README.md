# All Lingo Server

## Require
* Node v.8.0 이상
* Visual Studio Code
* MySQL 또는 MariaDB

---
## Global Install
```
npm install nodemon -g
npm install knex -g
npm install ts-node -g
```

---
## Run & Debug
for windows
```
npm run dev 
```
VSCODE debug를 할 때는 디버그 선택을 Attach에 두고 하면 됨.

---
## Knex  Migration
### Migration 만들기
```
knex migrate:make setup 
```

### Migration 적용 
```
knex migrate:latest  
```
제품에 적용
```
knex migrate:latest --env production 
```

### Rollback
```
knex migrate:rollback
```

---
## Home Page
### 사용 라이브러리
* [jsGrid](http://js-grid.com/)

---
## 참고 자료
### ORM
* [knex](http://knexjs.org)
  * [Knex Migration](http://knexjs.org/#Migrations)
  * [Running Migrations with Knex](https://alexzywiak.github.io/running-migrations-with-knex/) : 자료형 참고
  * [Database Migrations with Knex](http://perkframework.com/v1/guides/database-migrations-knex.html) : promise 참고
* [Bookshelf](http://bookshelfjs.org/)
  * 

### Node & Express
* [Express & bookshelf](https://github.com/billpatrianakos/coverage-web/tree/develop) : Cool
* [Getting Started with Node, Express and Postgres Using Sequelize](https://scotch.io/tutorials/getting-started-with-node-express-and-postgres-using-sequelize)
* [A boilerplate for Node.js web applications.](https://github.com/sahat/hackathon-starter)
* [Express, MySQL & MongoDB](https://github.com/qawemlilo/express-mysql)
* [Sequelize bookmarks application](https://github.com/connor11528/sequelize-bookmarks)


### Database ORM
* [Bookshelf](http://bookshelfjs.org/)
* [Running Migrations with Knex](https://alexzywiak.github.io/running-migrations-with-knex/)


### Bootstrap Theme
* [Essentia Free Bootstrap Template](https://bootstrapmaster.com/themes/free-bootstrap-themes/essentia-free-bootstrap-template)
  * [Download](https://bootstrapmaster.com/wp-content/plugins/wp-freebie-subscribe1/inc/download.php?1=355262)

### IDE
* [Visual Studio Code: Setting Environment Variable for Tasks](http://techbrij.com/visual-studio-code-tasks-debugging)
* [Using Nodemon and Visual Studio Code Debugger together to Automate Debugging Workflow](https://github.com/bdspen/nodemon_vscode)

### Express Typescript
* [Express Typescript Boilerplate](https://github.com/w3tecch/express-typescript-boilerplate)
* [Using Typescript with Node JS](https://inviqa.com/blog/using-typescript-node-js)
* [Server side typescript: express API example](http://blog.theburge.co/web/2016/06/30/typescript-express-api.html)
* [Typescript + ExpressJs 시작하기](https://mayajuni.github.io/2016/06/30/typescript-express/)

### ETC
* [Express.js 라우팅 핸들러에 async/await 을 적용할 수 있을까?](http://programmingsummaries.tistory.com/399)
* [프로덕션 우수 사례: 성능 및 신뢰성](http://expressjs.com/ko/advanced/best-practice-performance.html)
* [VSCODE with ts-node debug](https://stackoverflow.com/documentation/typescript/9131/debugging#t=201709050729395684193)