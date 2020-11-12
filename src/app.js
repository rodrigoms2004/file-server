const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')

const { log } = require('./util/loggerTool')

const app = express()

app.use(cors())

// Tell the bodyparser middleware to accept more data
app.use(bodyParser.json({limit: '50mb'}))
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}))

//middleware, used to show where user is going...
app.use((req, res, next) => {
    // don't work under npm test
    if(process.env.NODE_ENV !== "test") {
      log('api_server', 'info', `I was here: ${req.url}`)  
      // console.log('I was here: ', req.url)
    }
  
    next()
  })


// static route  to the folder uploads/files
app.use('/upload', express.static(path.resolve(__dirname, '..', 'uploads', 'files')))

app.use('/', express.static(__dirname + '/public'))


// ROUTES
app.use('/api', require('./routes'))

// middleware to deal with 404 error
app.use((req, res, next) => {
    let err = {
      message: 'route does not exist',
      status: 404
    }
    //let err = new Error('route does not exist')
    //err.status(404)
    next(err)  // send error to next middleware
})

// receives error from last middleware
app.use((err, req, res, next) => {
    // if error 404, sends back message 'route does not exist'
    // otherwise it sends Murphy's message
    log('api_server', 'error', `Error status ${err.status}, message: ${err.message}, url: ${req.url}.`)
    // console.log(err.status)
    res.status(err.status || 500).send(err.message || `Don't force it get a larger hammer.`)
})

module.exports = app