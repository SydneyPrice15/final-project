import { randomUUID } from "crypto";
import { diskStorage } from "multer";

const FILE_TYPE_MAP = {
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg',
    'image/png': 'png'
}

export const saveImage = {
    storage: diskStorage({
        destination(req, file, callback) {
            const isValid = FILE_TYPE_MAP[file.mimetype];
            let uploadError = new Error();
            if(isValid) {
                uploadError = null;
            }
            callback(uploadError, 'public/uploads');
        },
        filename(req, file, callback) {
            const fileName = randomUUID();
            const extension = FILE_TYPE_MAP[file.mimetype];
            callback(null, `${fileName}.${extension}`);
        },
    })
}