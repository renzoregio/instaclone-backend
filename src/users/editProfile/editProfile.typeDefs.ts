import { gql } from "apollo-server-express";

export default gql`

    type EditProfileResult {
        ok: Boolean!
        error: String
        next: String
    }

    type Mutation{
        editProfile(firstName: String, lastName: String, userName: String, email: String, bio: String, avatar: Upload, password: String): EditProfileResult!
    }

`