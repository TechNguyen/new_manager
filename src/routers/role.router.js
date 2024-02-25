import express from "express"
import RoleController from "../controller/Role/role.controller.js";

const router = express.Router();
const role = new RoleController();

router.post('/create', role.CreateRole)
router.get('/all', role.GetAll)
router.put('/edit', role.UpdateRole)

export default router