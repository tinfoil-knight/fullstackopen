const express = require('express')
const app = express()

const bodyParser = require('body-parser')
app.use(bodyParser.json())

const morgan = require('morgan')

// Creating a token for accessing body of request on POST
morgan.token('req_body', function(req, res) {
  if (req.method === 'POST'){
    return JSON.stringify(req.body);
  }
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :req_body'))


let persons = [
    {
      name: "Arto Hellas",
      number: "040-123456",
      id: 1
    },
    {
      name: "Ada Lovelace",
      number: "39-44-5323523",
      id: 2
    },
    {
      name: "Dan Abramov",
      number: "12-43-234345",
      id: 3
    },
    {
      name: "Mary Poppendieck",
      number: "39-23-6423122",
      id: 4
    }
  ]


app.get('/api/persons', (request, response) => {
  response.json(persons)
  })

app.get('/info', (request, response) => {
  response.send(`Phonebook has info for ${persons.length} people` + "<br>" + `${new Date()}`)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)

  if (person) {response.json(person)}
  else {response.status(404).end()}
})

app.post('/api/persons', (request, response) => {
  const person = request.body
  // random id is generated as told
  // But use this to sequentially generate ids:
  //   const generateId = () => {
  //   const maxId = notes.length > 0
  //     ? Math.max(...notes.map(n => n.id))
  //     : 0
  //   return maxId + 1
  // }
  if (!person.number){
    return response.status(400).json({error: 'content missing'}).end()
  }

  const checker = persons.filter(el => el.name === person.name).length
  if (checker){
    return response.status(400).json({error: 'name already exists'}).end()
  }

  person.id = Math.floor(Math.random() * 5000)
  persons = persons.concat(person)

  response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
  })


const PORT = 3001
app.listen(PORT, ()=>{console.log(`Server running on ${PORT}`)})
