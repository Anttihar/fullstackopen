import { gql } from "@apollo/client";

export const ALL_BOOKS = gql`
  query($author: String, $selectedGenre: String) {
    allBooks(
      author: $author,
      genre: $selectedGenre
    ) {
      title
      author {
        name
      }
      published
      genres
    }
  }
`

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`

export const ADD_BOOK = gql`
  mutation createBook(
    $title: String!,
    $author: String!,
    $published: Int!,
    $genres: [String!]!
  ) {
    addBook(
      title: $title,
      author: $author,
      published: $published,
      genres: $genres
    ) {
      title
      author {
        name
      }
      published
      genres
    }
  }
`

export const ADD_BORN = gql`
  mutation addBorn(
    $addBirth: String!
    $born: Int!
  ) {
    editAuthor(
      name: $addBirth,
      born: $born
    ) {
      name
      born
    }
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      username
      favoriteGenre
    }
  }
`