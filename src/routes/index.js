// CRUD = Create, Read, Update, Delete
// Create = POST method
// READ   = GET method
// UPDATE = PUT method
// DELETE = DELETE method

const multer = require('multer')
const { storage } = require('../config/upload')
const path = require('path')
const router = require('express').Router()

// const { log } = require('../util/loggerTool')

router.post('/upload-file', (req, res) => {
  console.log(req.file)
  const upload = multer({ storage: storage }).single('filename')
  

  upload(req, res, function(err) {
  
    if (!req.file) {
      return res.send('Please select a file to upload')
    }
    else if (err instanceof multer.MulterError) {
      return res.send(err)
    }

    // res.status(200).send(`You have uploaded this image: <hr/><img src="${req.file.path}" 
    // width="500"><hr /><a href="./">Upload another image</a>`)
    res.status(200).send(`You have uploaded this file: ${req.file.originalname}`)
  })
})


router.get('/download-file', (req, res) => {
  const file = path.resolve(__dirname, '..', '..', 'storage', 'filename_download.mp4')
  // res.status(200).send(file)
  res.download(file)
})

// Test
router.get('/test', (req, res) => {
  //res.status(404).send('Hello world!')
  // console.log(req.headers)
  const timestp = new Date()
  res.status(200).send({
   nome: 'Test API',
   tempo: timestp.toJSON()
  })
})

module.exports = router