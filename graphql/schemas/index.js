const { gql } = require('apollo-server-express');

const usersSchema = require('./users.schema');
const itemsSchema = require('./items.schema');
const categoriesSchema = require('./categories.schema');


module.exports = gql`
   type Query {
     _: Boolean
   }

   type Mutation {
     _: Boolean
   }
   ${usersSchema}
   ${itemsSchema}
   ${categoriesSchema}
 `;
