import express from "express"
import RoleController from "../controller/Role/role.controller.js";

const router = express.Router();
const role = new RoleController();

router.post('/create', role.CreateRole)

export default router