import express from 'express';
import userController from './../controllers/userController.js';



const router = express.Router();
router.use(express.json());

router.post('/sign-in', userController.validateUser);
router.get('/email', userController.validateDuplicatedEmail);



export default router;