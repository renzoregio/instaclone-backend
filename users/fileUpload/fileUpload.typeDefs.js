import { gql } from "apollo-server-express";

export default gql`
    
    scalar Upload

    type File {
        filename: String!
        mimetype: String!
        encoding: String!
    }

    type Mutation {
        singleUpload(file: Upload!): File!
    }

`