import { gql } from "apollo-server-express";

export default gql`

    type Query {
        searchUsers(userName: String!, lastId: Int): [User]
    }

`