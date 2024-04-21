import fs from 'fs'
import path from 'path';
const __dirname = path.resolve();

function validateUser(email, password) {
    //user.json파일 읽기
    const usersJsonFile = fs.readFileSync(__dirname + '/models/users.json', 'utf8');
    const usersJsonData = JSON.parse(usersJsonFile);

    for (let i = 0; i < usersJsonData.length; i++) {
        let user = usersJsonData[i];
        if (user.email === email && user.password === password) {
            return true;
        }
    }
    
    return false;
}



export default {
    validateUser
};