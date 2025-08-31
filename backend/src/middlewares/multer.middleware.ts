import { Request } from 'express';
import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req:Request, file:any, cb:any) {
        cb(null, '/public/temp/');
    },
    filename: function (req:Request, file:any, cb:any){
        cb(null, Date.now() + '-' + file.originalname)
    }
});

const upload = multer({ storage: storage });

export default upload;
