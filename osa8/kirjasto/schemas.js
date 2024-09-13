const typeDefs = `#graphql
  type Query {
    bookCount: Int!
    authorCount: Int!
    allAuthors: [Author]
    allGenres: [Genre]
    allBooks(author: String = "", genre: String = ""): [Book]
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      born: Int!
    ): Author
  }

  type Book {
    title: String!
    author: String!
    published: Int!
    genres: [String]
  }

  type Author {
    name: String!
    id: String!
    born: Int
    bookCount: Int
  }

  type Genre {
    name: String
    id: String
  }
`

module.exports = typeDefs