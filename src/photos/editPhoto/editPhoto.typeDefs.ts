import { gql } from "apollo-server-express";

export default gql`

    type EditPhotoResult {
        ok: Boolean!
        error: String
    }

    type Mutation {
        editPhoto(photoId: Int!, newCaption: String!) : EditPhotoResult! 
    }

`