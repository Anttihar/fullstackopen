const typeDefs = `#graphql
  type Query {
    bookCount: Int!
    authorCount: Int!
    allAuthors: [Author]
    allBooks(author: String, genre: String): [Book!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book!
    editAuthor(
      name: String!
      born: Int!
    ): Author!
    createUser(
      username: String!
      favoriteGenre: String!
    ): User!
    login(
      username: String!
      password: String!
    ): Token!
  }

  type Subscription {
    bookAdded: Book!
  }

  type Book {
    title: String!
    author: Author!
    published: Int!
    genres: [String!]!
  }

  type Author {
    name: String!
    born: Int
    books: [Book!]!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
    books: [Book!]!
  }

  type Token {
    token: String!
    username: String!
    favoriteGenre: String!
  }
`

module.exports = typeDefs