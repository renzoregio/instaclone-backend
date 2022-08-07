import { gql } from "apollo-server-express";

export default gql`

    type DeletePhotoResults {
        ok: Boolean!
        error: String
    }

    type Mutation {
        deletePhoto(id: Int!): DeletePhotoResults!
    }

`