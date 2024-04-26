import express from 'express';
import userController from './../controllers/userController.js';


const router = express.Router();
 
router.post('/', userController.createUser);
router.post('/sign-in', userController.validateUser);
router.get('/email', userController.validateDuplicatedEmail);
router.get('/nickname', userController.validateDuplicatedNickname);

router.get('/:userId', userController.getUser);
router.patch('/:userId', userController.updateUser);
router.delete('/:userId', userController.deleteUser);

router.patch('/:userId/password', userController.updateUserPassword);


export default router;