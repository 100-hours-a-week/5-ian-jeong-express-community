import express from 'express'; 
import path from 'path';

const app = express();
const port = 8081; 
const __dirname = path.resolve();



app.listen(port, () => { 
    console.log(`====================================== COMMUNITY BACKEND SERVER START ! ======================================`);
    console.log(`PORT NUMBER -> ${port}`);
});

