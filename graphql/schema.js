const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    
    type AuthData {
        token: String!
        userId: String!
    }

    type RootQuery {
        login(username: String!, password: String!): AuthData!
    }


    schema {
        query: RootQuery
    }
`);
