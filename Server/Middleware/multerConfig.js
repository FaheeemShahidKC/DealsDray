import multer from "multer";
import fs from 'fs'

const storage = multer.diskStorage({
    destination : (req, file, cb) => {
    
        const destination = '../client/public/uploads';
        if(!fs.existsSync(destination)){
            fs.mkdirSync(destination, { recursive: true });
        }
        
        cb(null, destination)
    },
    filename : (req, file, cb) =>{
        cb(null, Date.now() + '-' + file.originalname)
    }
})
export const upload = multer({storage : storage})