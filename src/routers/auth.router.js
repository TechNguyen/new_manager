import express from "express"
import authController from "../controller/Auth/auth.controller.js";
import appMiddleware from "../middleware/app.middleware.js";
const router = express.Router();
const auth = new authController();

router.post('/sign-up', auth.signUp)
router.post('/sign-in', auth.signIn)
export default router