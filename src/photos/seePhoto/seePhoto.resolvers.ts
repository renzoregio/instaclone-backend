import { Photo } from "@prisma/client";
import { SeePhotoArgs } from "../../types/photos/resolverTypes";
import { Context } from "../../types/common/context";
import { Resolvers } from "../../types/common/resolvers";


const resolvers: Resolvers = {
    Query: {
        seePhoto: async(_, { id } : SeePhotoArgs, { client } : Context) : Promise<Photo> => {
            return await client.photo.findUnique({ where: { id }})
        }
    }
}

export default resolvers;