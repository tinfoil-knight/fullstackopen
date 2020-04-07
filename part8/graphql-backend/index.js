require('dotenv').config()

const { ApolloServer, gql } = require('apollo-server')
const mongoose = require('mongoose')

const Author = require('./models/author')
const Book = require('./models/book')

mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)
mongoose.set('useUnifiedTopology', true)

const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connection to MongoDB:', error.message)
    })

const typeDefs = gql`
type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
}

type Book {
    title: String!
    published: Int
    author: Author
    id: ID!
    genres: [String]!
}

type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
}

type Mutation {
    addBook(
        title: String!
        published: Int
        author: String
        genres: [String]!
    ) : Book
    editAuthor(
        name: String!
        setBornTo: Int!
    ) : Author
}
`

const resolvers = {
    Query: {
        bookCount: () => Book.collection.countDocuments(),
        authorCount: () => Author.collection.countDocuments(),
        allBooks: (root, args) => Book.find({}),
        // .filter(book => !args.author ? book : book.author === args.author)
        // .filter(book => !args.genre ? book : book.genres.includes(args.genre)),
        allAuthors: () => Author.find({})
    },
    // Author: {
    //     bookCount: (root) => {
    //         return books.filter(book => book.author === root.name).length
    //     }
    // },
    Mutation: {
        addBook: (root, args) => {
            const book = new Book({ ...args })
            return book.save()

            // if (!authors.find(author => author.name === book.author)) {
            //     authors = authors.concat({ name: book.author, id: uuidv4() })
            // }
        },
        // editAuthor: (root, args) => {
        //     const authorToUpdate = authors.find(author => author.name === args.name)
        //     if (!authorToUpdate) {
        //         return null
        //     }
        //     const updatedAuthor = { ...authorToUpdate, born: args.setBornTo }
        //     authors = authors.map(author => author.id !== updatedAuthor.id ? author : updatedAuthor)
        //     return updatedAuthor
        // }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
})

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`)
})