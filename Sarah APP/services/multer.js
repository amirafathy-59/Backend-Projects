const multer = require('multer');
const path = require('path')
const { nanoid } = require('nanoid')
const fs = require("fs")

const validateFileMthod = {
    image: ['image/jpg', 'image/jpeg', 'image/png'],
    textFile: ['application/pdf'],

}
function myMulter(customPath, validateType) {
    const fullPath = path.join(__dirname, `../uploads/${customPath}`)
    if (!fs.existsSync(fullPath)) { // return true if fullPath is exist else return false 
        fs.mkdirSync(fullPath, { recursive: true }/*to create nested folders*/ )
    }
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            req.destinationFile = `uploads/${customPath}`
            cb(null, fullPath)
        },
        filename: function (req, file, cb) {
            console.log(file);
            const fullFileName = nanoid() + "_" + file.originalname
            cb(null, fullFileName)
        }
    })
    const fileFilter = function (req, file, cb) {
        if (validateType.includes(file.mimetype)) {
            cb(null, true)
        } else {
            req.fileValidation = true
            cb(null, false)
        }
    }
    const upload = multer({ det: fullPath, fileFilter, storage })
    return upload
}


module.exports = {myMulter , validateFileMthod}