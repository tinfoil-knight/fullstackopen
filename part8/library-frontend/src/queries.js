import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
query allAuthors{
    allAuthors {
      name
      born
      bookCount
    }
  }  
`

export const ALL_BOOKS = gql`
query allBooks{
    allBooks {
      title
      author {
        name
      }
      published
    }
  }  
`

export const ADD_BOOK = gql`
mutation createBook($title: String!,  $published: Int, $author: String!, $genres: [String]!) {
  addBook(
    title: $title
    published: $published
    author: $author
    genres: $genres
  ) {
    title
    author
  }
}
`

export const EDIT_AUTHOR = gql`
mutation editAuthor($name: String!, $setBornTo: Int!) {
  editAuthor(
    name: $name
    setBornTo: $setBornTo
  ) {
    name
    born
  }
}
`

export const LOGIN = gql`
mutation loginUser($username: String!, $password: String! ){
  login(
    username: $username
    password: $password
  ) {
    value
  }
}
`