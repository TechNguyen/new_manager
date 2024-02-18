import express from 'express'
import ProductController from '../controller/Product/product.controller.js';
import multer from 'multer'
const router = express.Router();

const storeage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null, './public/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})
const upload = multer({ storage: storeage})
const uploadImage = multer({ storage: storeage})
const product = new ProductController();
router.post('/create', product.CreatePro)
router.get('/get', product.GetProductbyPage)
router.put('/update', product.Update)
router.delete('/deletesoft', product.DeleteSoft)
router.delete('/delete', product.Delete)

//upload image
router.post('/upload', upload.array("files"), product.UploadImages)

//import export
router.post('/import-product', upload.single("import"), product.ImportProduct )
router.get('/export-excel', product.ExportProduct)

export default router;

