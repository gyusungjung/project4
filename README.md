# 환경변수

.env 파일 생성 후 아래 내용 추가

## 설명

- SERVER_PORT: 서버 포트 번호
- MYSQL_USERNAME: MySQL 사용자 이름
- MYSQL_PASSWORD: MySQL 비밀번호
- MYSQL_DATABASE: MySQL Database 이름
- MYSQL_HOST: MySQL 주소
- PASSWORD_HASH_SALT_ROUNDS: bcrypt salt 보안 강도 (숫자가 높으면 보안은 강화되지만 시간이 오래 걸림)
- JWT_ACCESS_TOKEN_SECRET: JWT AccessToken 비밀번호

## 예시

```bash
SERVER_PORT=3000
MYSQL_USERNAME="root"
MYSQL_PASSWORD="rootpassword"
MYSQL_DATABASE="sparta_nodejs_db"
MYSQL_HOST="aws.rds.com"
PASSWORD_HASH_SALT_ROUNDS=10
JWT_ACCESS_TOKEN_SECRET="jwt-serect-key"
```

# 실행 방법

```bash
yarn dev
```

# API 명세서 URL

https://docs.google.com/spreadsheets/d/1-_HMdxZOUkmOLYcTqN8UHypJoMVHqESIze3s_gbDywo/edit?usp=sharing

# ERD URL

https://www.erdcloud.com/d/zzo9JoKE9Z7zfHTwq

# 더 고민해 보기

1. Class와 Instance가 각각 무엇인지 설명해 주세요.

2. Class의 Method는 화살표 함수(Arrow Function) 형태로 구현하지 않았을 때 발생할 수 있는 문제와 해당 문제를 해결할 수 있는 다른 방법을 적어주세요. (Hint: this bind)

3. 3-Layered Architecture의 장점과 단점을 아는대로 적어주세요.

4. 숙련주차 과제에서 Mongoose를 Sequelize로 교체 했을 때와 비교하여 이번 과제에서 Sequelize를 Prisma로 교체하는 작업은 더 쉬웠나요? 더 어려웠나요? 왜 그런지 3-Layered Architecture를 기반으로 설명해 주세요.

5. 테스트코드 작성의 장점과 단점을 아는대로 적어주세요.

6. 테스트의 종류 3가지와 각각이 무엇인지 간단히 설명해 주세요.
