const url = process.env.MONGODB_URI

const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)

console.log('connecting to', url)

mongoose.connect(url, { useNewUrlParser: true })
.then(result => {console.log('connected to MongoDB')})
.catch((error) => {console.log('error connecting to MongoDB:', error.message)})

const uniqueValidator = require('mongoose-unique-validator')

const personSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, minlength: 3 },
  number: { type: String, required: true, unique: true, minlength: 8 },
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

personSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Person', personSchema)
