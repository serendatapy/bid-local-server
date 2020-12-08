module.exports = `
type Item {
  id: String!
  name: String!
  minPrice: Int!
  description: String
  picUrl1: String
  picUrl2: String
  picUrl3: String
  user: User!
  category: Category
}

input ItemUpdate {
  name: String!
  minPrice: Int!
  description: String
  picUrl1: String
  picUrl2: String
  picUrl3: String
  categoryId: ID
}

extend type Query {
  get_item_by_Id(id: ID!): Item
  get_items: [Item]
}

extend type Mutation {
  create_item(item: ItemUpdate!): Item!
  delete_item_by_id(itemId: ID!): Boolean!
  update_item(itemId:ID!,item:ItemUpdate!): Item!
}

`;

//userId: ID!,