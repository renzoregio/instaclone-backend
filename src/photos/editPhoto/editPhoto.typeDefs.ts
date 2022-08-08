import { gql } from "apollo-server-express";

export default gql`

    type Mutation {
        editPhoto(photoId: Int!, newCaption: String!) : MutationResult! 
    }

`