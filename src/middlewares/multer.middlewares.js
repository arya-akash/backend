// import multer from "multer";
// import path from "path";
// import fs from "fs"

// const storage =multer.diskStorage({
//     destination:function(req,file,cb){
//         cb(null,'./public/temp')
//     },
//     filename:function(req,file,cb){

//         cb(null,file.filename)
//     }
// })

// export const upload =multer({storage,})

import multer from "multer";
import path from "path";
import fs from "fs";

// Ensure the upload directory exists
const uploadDir = path.join(process.cwd(), "public", "temp");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir); // ✅ must be a valid string path
  },
  filename: function (req, file, cb) {
    // ✅ file.originalname always exists
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

export const upload = multer({ storage });
