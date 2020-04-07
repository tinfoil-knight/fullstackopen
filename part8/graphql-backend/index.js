require('dotenv').config()

const { ApolloServer, gql, UserInputError, AuthenticationError } = require('apollo-server')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')

const MONGODB_URI = process.env.MONGODB_URI
const JWT_SECRET = process.env.JWT_SECRET

console.log('connecting to', MONGODB_URI)

mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)
mongoose.set('useUnifiedTopology', true)
mongoose.set('useNewUrlParser', true)

mongoose.connect(MONGODB_URI)
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
    author: Author!
    id: ID!
    genres: [String]!
}

type User {
    username: String!
    favoriteGenre: String
    id: ID!
}
  
type Token {
    value: String!
}

type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
}

type Mutation {
    addBook(
        title: String!
        published: Int
        author: String!
        genres: [String]!
    ) : Book

    editAuthor(
        name: String!
        setBornTo: Int!
    ) : Author

    createUser(
        username: String!
        favoriteGenre: String
    ): User

    login(
        username: String!
        password: String!
    ): Token
}
`

const resolvers = {
    Query: {
        bookCount: () => Book.collection.countDocuments(),
        authorCount: () => Author.collection.countDocuments(),
        allBooks: (root, args) => Book.find(!args.genre ? {} : { genres: args.genre }),
        allAuthors: () => Author.find({}),
        me: (root, args, context) => context.currentUser
    },
    Book: {
        author: (root) => Author.findById(root.author)
    },
    Author: {
        bookCount: async (root) => {
            console.log("trying")
            const books = await Book.find({ author: root.id })
            console.log(books)
            return books.length
        }
    },
    Mutation: {
        addBook: async (root, args, context) => {
            const currentUser = context.currentUser

            if (!currentUser) {
                throw new AuthenticationError("not authenticated")
            }

            const search = await Author.find({ name: args.author })

            const author = search.length ? search[0] : await (new Author({ name: args.author })).save()
            const book = new Book({ ...args, author: author._id })

            try {
                await book.save()
            }
            catch (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: args,
                })
            }

            return book
        },

        editAuthor: async (root, args, context) => {
            const currentUser = context.currentUser

            if (!currentUser) {
                throw new AuthenticationError("not authenticated")
            }

            try {
                return (await Author.findOneAndUpdate({ name: args.name }, { born: args.setBornTo }, { new: true }))
            }
            catch (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: args,
                })
            }
        },

        createUser: async (root, args) => {
            const user = new User({ username: args.username })
            try {
                await user.save()
            }
            catch (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: args
                })
            }

            return user
        },

        login: async (root, args) => {
            const user = await User.findOne({ username: args.username })

            if (!user || args.password !== 'secred') {
                throw new UserInputError("wrong credentials")
            }

            const userForToken = {
                username: user.username,
                id: user._id,
            }

            return { value: jwt.sign(userForToken, JWT_SECRET) }
        }
    }
}

const context = async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
        const decodedToken = jwt.verify(
            auth.substring(7), JWT_SECRET
        )
        const currentUser = await User.findById(decodedToken.id)
        return { currentUser }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: context
})

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`)
})