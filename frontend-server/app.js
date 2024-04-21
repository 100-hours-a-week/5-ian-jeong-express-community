import express from 'express'; 
import path from 'path';
import userRouter from './routes/userRouter.js';

const app = express();
const port = 8080; 
const __dirname = path.resolve();


app.use(express.static(__dirname + "/public")); 
app.use('/users', userRouter);

app.listen(port, () => { 
    console.log(`====================================== COMMUNITY FRONTEND SERVER START ! ======================================`);
    console.log(`PORT NUMBER -> ${port}`);
});

