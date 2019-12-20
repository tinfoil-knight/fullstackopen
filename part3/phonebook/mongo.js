const mongoose = require('mongoose')

if (process.argv.length < 3){
  console.log("Provide password in argument")
  process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://kevin99:${password}@cluster0-s12qk.mongodb.net/test?retryWrites=true&w=majority`

// test database is created if it does not exist already
mongoose.connect(url, { useNewUrlParser: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

// displays all results in the phonebook if only password is provided
if (process.argv.length == 3){
  console.log("phonebook:\n")

  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person)
    })
    mongoose.connection.close()
  })
}

// adds contact to phonebook and logs to console
else if (process.argv.length == 5){
  const name = process.argv[3]
  const number = process.argv[4]

  const person = new Person({
    name: `${name}`,
    number: `${number}`,
  })

  person.save().then(response => {
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })
}

else{
  mongoose.connection.close()
}
