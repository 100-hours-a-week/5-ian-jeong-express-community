import express from 'express'; 
import path from 'path';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import userRouter from './routes/userRouter.js';
import postRouter from './routes/postRouter.js';

const app = express();
const port = 8080; 
const __dirname = path.resolve();

app.use(cookieParser());
app.use(express.static(__dirname + "/public")); 
app.use(cors());


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'view/index.html'));
});

app.use('/users', userRouter);
app.use('/posts', postRouter);

app.listen(port, () => { 
    console.log(`====================================== COMMUNITY FRONTEND SERVER START ! ======================================`);
    console.log(`PORT NUMBER -> ${port}`);
});

