require('dotenv').config()
const express = require('express')
const app = express()
app.use(express.static('build'))

const bodyParser = require('body-parser')
app.use(bodyParser.json())

const cors = require('cors')
app.use(cors())

const morgan = require('morgan')

morgan.token('req_body', function(req, res) {
  if (req.method === 'POST' || req.method === 'PUT'){
    return JSON.stringify(req.body);
  }
});

morgan.token('req_key', function(req, res) {
  if (req.method === 'GET' || req.method === 'PUT'){
    return JSON.stringify(req.params.id);
  }
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :req_body :req_key'))

const Person = require('./models/person')


app.get('/api/persons', (request, response) => {
  Person
  .find({})
  .then(persons => {
    response.json(persons.map(person => person.toJSON()))
  })
})

app.get('/api/persons/:id', (request, response) => {
  Person
  .findById(request.params.id)
  .then(person => {
    response.json(person.toJSON())
  })
  .catch(error => {
    console.log(error)
    response.status(404).end()
  })
})

app.get('/info', (request, response) => {
  Person
  .countDocuments()
  .then(count => {
    response.send(`Phonebook has info for ${count} people` + "<br>" + `${new Date()}`)
  })
  .catch(error => {
    console.log(error)
    response.status(404).end()
  })
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person
  .save()
  .then(savedContact => {
    response.json(savedContact.toJSON())
  })
  .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body
  const person = {
    name: body.name,
    number: body.number,
  }

  Person
  .findByIdAndUpdate(request.params.id, person, { new: true })
  .then(updatedContact => {
      response.json(updatedContact.toJSON())
    })
  .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person
  .findByIdAndRemove(request.params.id)
  .then(result => {
    response.status(204).end()
  })
  .catch(error => {next(error)})
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {

  if (error.name === 'CastError' && error.kind == 'ObjectId')
  {
    return response.status(400).send({ error: 'malformatted id' })
  }
  else if (error.name === 'ValidationError')
  {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)


const PORT = process.env.PORT
app.listen(PORT, ()=>{console.log(`Server running on ${PORT}`)})
