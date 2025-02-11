import express from 'express';
import * as userController from "../controllers/user.controller.js";
import { body } from 'express-validator';
import * as authMiddleware from "../middlewares/auth-middleware.js"

const router = express.Router();

// Define your routes here
router.post('/register',
    
        body('email').isEmail().withMessage('Please enter a valid email address'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    
     userController.createUser);

    router.post('/login',
        body('email').isEmail().withMessage('Please enter a valid email address'),
        body('password').notEmpty().withMessage('Password is required'),
        userController.loginUser);


    router.get("/profile",authMiddleware.authMiddleware, userController.userProfile)

    router.get('/logout', authMiddleware.authMiddleware, userController.logout);

export default router;