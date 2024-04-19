import express from 'express'; 
import path from 'path';

const app = express();
const port = 8080; 
const __dirname = path.resolve();



app.use(express.static(__dirname + "/public")); 

app.listen(port, () => { 
    console.log(`====================================== COMMUNITY FRONTEND SERVER START ! ======================================`);
    console.log(`PORT NUMBER -> ${port}`);
});

app.get('/sign-in', (req, res) => {	
    const filePath = path.join(__dirname, 'view', 'sign-in.html')
    res.sendFile(filePath);
});
