import { gql } from "apollo-server-express";

export default gql`

    type Mutation {
        editComment(id: Int!, newPayload: String!): MutationResult!
    }

`