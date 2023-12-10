import express from 'express';
import router from './routers/index.js';
import authMiddleware from './middlewares/need-signin.middleware.js';
import ErrorHandlingMiddleware from './middlewares/error-handler.middleware.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.SERVER_PORT;

//app.use(authMiddleware); 전역으로 인증을 필요하게 할때
app.use(express.json());
app.use('/api', router);
app.use(ErrorHandlingMiddleware);

app.listen(PORT, () => {
  console.log(PORT, '포트로 서버가 열렸어요!');
});
