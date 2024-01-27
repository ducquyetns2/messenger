const multer = require('multer')
const path = require('path')
const IMAGEDIR = require('./constant').IMAGESTORE

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, IMAGEDIR)
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now()
        const ext = path.extname(file.originalname)
        cb(null, file.fieldname + '-' + uniqueSuffix + ext)
    }
})
module.exports = storage