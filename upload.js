const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: "./public/user-profile/",
    filename: function(req, file, cb){
        cb(null,"IMAGE-" + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
   storage: storage,
})

module.exports = upload;