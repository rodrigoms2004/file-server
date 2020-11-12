const multer = require('multer')
const path = require('path')
const { log } = require('../util/loggerTool')

const storage = multer.diskStorage({
  destination: path.resolve(__dirname, '..', '..', 'uploads'),
  
  filename: (req, file, callback) => {
    log('storage-middleware', 'info', `Filename ${file.originalname}`)
    callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})

module.exports = { storage }