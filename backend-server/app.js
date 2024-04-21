import express from 'express'; 
import cors from 'cors';

import userRouter from './routes/userRouter.js';
import postRouter from './routes/postRouter.js';

const app = express();
const port = 8081; 

app.use(cors());
app.use('/users', userRouter);
app.use('/posts', postRouter);

app.listen(port, () => { 
    console.log(`====================================== COMMUNITY BACKEND SERVER START ! ======================================`);
    console.log(`PORT NUMBER -> ${port}`);
});

