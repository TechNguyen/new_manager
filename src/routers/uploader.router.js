import express from 'express';
import upLoad from '../middleware/upload.middleware.js';
import UploadController from '../controller/Upload/upload.controller';
const uploadControl = new UploadController()
const router = express.Router();
router.post('/upload', upLoad.single('file'), uploadControl.handleUpload)

export default router;
