import express from "express"
import ProfilleController from "../controller/Profile/Profile.controller.js";
const router = express.Router();
const profile = new ProfilleController();

router.put('/edit', profile.UpdateProfile)
router.post('/create', profile.CreateProfile)
router.get('/account/:account_id', profile.GetById)
router.get('/:id', profile.GetId)

export default router