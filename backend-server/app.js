import express from 'express'; 

import userRouter from './routes/userRouter.js';
import cors from 'cors';

const app = express();
const port = 8081; 

app.use(cors());
app.use('/users', userRouter);

app.listen(port, () => { 
    console.log(`====================================== COMMUNITY BACKEND SERVER START ! ======================================`);
    console.log(`PORT NUMBER -> ${port}`);
});

