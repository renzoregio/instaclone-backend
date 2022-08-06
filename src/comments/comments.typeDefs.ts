import { gql } from "apollo-server-express";

export default gql`

    type Comment {
        id: Int!
        user: User!
        photo: Photo!
        isMyComment: Boolean!
        payload: String!
        createdAt: String!
        updatedAt: String!
    }

`