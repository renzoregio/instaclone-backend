import { gql } from "apollo-server-express";

export default gql`

    type Photo {
        id: Int!
        user: User!
        file: String!
        caption: String
        likes: Int! 
        commentCount: Int!
        comments: [Comment]
        isMyPhoto: Boolean!
        isLiked: Boolean!
        hashtags: [Hashtag]
        createdAt: String!
        updatedAt: String!
    }


    type Hashtag {
        id: Int!
        hashtag: String!
        photos(lastId: Int): [Photo]
        totalPhotos: Int!
        createdAt: String!
        updatedAt: String!
    }

    type Like {
        id: Int!
        photo: Photo!
        createdAt: String!
        updatedAt: String!
    }

`