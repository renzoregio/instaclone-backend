import { User } from "@prisma/client";
import { Context } from "../../types/common/context";
import { Resolvers } from "../../types/common/resolvers";
import { SeePhotoLikesArgs } from "../../types/photos/resolverTypes";

const resolvers : Resolvers = {
    Query: {
        seePhotoLikes: async(_, { photoId } : SeePhotoLikesArgs, { client } : Context) : Promise<User[]> => {
            const users = await client.like.findMany({ where: { photoId }, select: { user : true }})
            return users.map(userObj => userObj.user)
        }
    }
} 

export default resolvers;