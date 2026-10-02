import { Router } from 'express'
import { getAllUsers, userLogin, userSignup, verifyUser } from '../controllers/user-controllers.js';
import { loginValidator, signupValidator, validate } from '../utils/validators.js';
import { verifyToToken } from '../utils/token-manager.js';

const userRoutes = Router();

userRoutes.get("/",getAllUsers)
userRoutes.post("/signup",validate(signupValidator),userSignup)
userRoutes.post("/login",validate(loginValidator),userSignup)
userRoutes.get("/auth-status",verifyToToken,verifyUser)

export default userRoutes;