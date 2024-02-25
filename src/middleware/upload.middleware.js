import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary} from 'cloudinary'
import multer from 'multer';

cloudinary.config({
    cloud_name: 'dwfjwrh8a', 
    api_key: '916367626457865', 
    api_secret: 'MYTGVsP0Hkswzq9KXUn_Wpnbm14' 
})
const storeage = new CloudinaryStorage({
    cloudinary: cloudinary,
    allowedFormats: ['jpg', 'png'],
    params: {
        folder: "blogs",
        resource_type: "auto",
    },
})
const upLoad = multer({storage: storeage})
export default upLoad