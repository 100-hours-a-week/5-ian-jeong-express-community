import express from 'express';
import bodyParser from 'body-parser';
import userController from './../controllers/userController.js';



const router = express.Router();

 
router.post('/', userController.createUser);
router.post('/sign-in', userController.validateUser);
router.get('/email', userController.validateDuplicatedEmail);
router.get('/nickname', userController.validateDuplicatedNickname);

router.get('/:userId', userController.getUser);



export default router;