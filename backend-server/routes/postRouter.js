import express from 'express';
import bodyParser from 'body-parser';
import postController from './../controllers/postController.js';
import methodOverride from 'method-override';

 


const router = express.Router();
router.use(methodOverride('_method'));
router.use(express.json());
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

router.get('/', postController.getPosts);
router.post('/', postController.createPost);
router.get('/:postId', postController.getPost);
router.get('/:postId/comments', postController.getComments);

router.delete('/:postId', postController.deletePost);
router.patch('/:postId', postController.updatePost);



export default router;