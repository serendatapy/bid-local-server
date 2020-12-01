module.exports = `
type User {
    id: ID!
    username: String!
    item: [Item!]
  }

  type Item {
    id: String!
    name: String!
    minPrice: Int
    description: String
    user: User!
  }`;