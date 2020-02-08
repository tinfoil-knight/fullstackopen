require('dotenv').config()
const config = require('./utils/config')

const express = require('express')
const app = express()

const bodyParser = require('body-parser')
app.use(bodyParser.json())

const cors = require('cors')
app.use(cors())

const blogRouter = require('./controllers/blogs')
app.use('/api/blogs', blogRouter)

const mongoose = require('mongoose')

const logger = require('./utils/logger')
logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
  })


const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

module.export = app
