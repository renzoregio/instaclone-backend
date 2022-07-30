import { gql } from "apollo-server-express";

export default gql`

    type User {
        id: Int!
        firstName: String!
        lastName: String
        userName: String!
        email: String!
        bio: String 
        avatar: Upload
        followers: [User]
        following: [User]
        createdAt: String!
        updatedAt: String!
    }

`