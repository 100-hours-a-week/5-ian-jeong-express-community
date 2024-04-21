import fs from 'fs'
import path from 'path';
const __dirname = path.resolve();




function getPosts() {
    const postsJsonFile = fs.readFileSync(__dirname + '/models/posts.json', 'utf8');
    const postsJsonData = JSON.parse(postsJsonFile);

    return postsJsonData;
}











export default {
    getPosts
};