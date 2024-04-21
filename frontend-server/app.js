import express from 'express'; 
import path from 'path';
import cors from 'cors';

import userRouter from './routes/userRouter.js';
import postRouter from './routes/postRouter.js';

const app = express();
const port = 8080; 
const __dirname = path.resolve();


app.use(express.static(__dirname + "/public")); 
app.use(cors());

app.use('/users', userRouter);
app.use('/posts', postRouter);

app.listen(port, () => { 
    console.log(`====================================== COMMUNITY FRONTEND SERVER START ! ======================================`);
    console.log(`PORT NUMBER -> ${port}`);
});

