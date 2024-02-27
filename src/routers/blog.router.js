import express from 'express'
import BlogController from '../controller/Blog/Blog.controller.js';
import multer from 'multer'
const router = express.Router();
import upLoad from '../middleware/upload.middleware.js';
const blog = new BlogController();
router.get('/getBlog', blog.FindById)
router.get('/account', blog.FindByAccount)
router.post('/create', blog.CreatePro)
router.get('/get', blog.GetBlogbyPage)
router.put('/update/:id', blog.Update)
router.delete('/deletesoft/:id', blog.DeleteSoft)
router.delete('/delete/:id', blog.Delete)
export default router;
