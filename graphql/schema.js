const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    
    type AuthData {
        token: String!
        userId: String!
    }
    
    type KeyfeatureData{
        id:String!
        title: String!
        description: String!
        icon: String!
    }
    
    type KeyfeatureslistData{
        keyfeatures:[KeyfeatureData!]
    }
    
    input keyfeaturesinputData{
        title: String!
        description: String!
        icon: String!
    }
    
    

    type RootQuery {
        login(username: String!, password: String!): AuthData!
        getAllKeyfeatures:KeyfeatureslistData
        getKeyfeaturebyid(id:String!):KeyfeatureData
    }
    
    type RootMutation {
        updatekeyfeaturesbyid(id:String!,keyfeature:keyfeaturesinputData):KeyfeatureData
    }
    
    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
