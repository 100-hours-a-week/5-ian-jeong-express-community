import express from 'express';
import bodyParser from 'body-parser';
import postController from './../controllers/postController.js';



const router = express.Router();
router.use(express.json());
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

router.get('/', postController.getPosts);
router.post('/', postController.createPost)


export default router;