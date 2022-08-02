import { Hashtag, User } from "@prisma/client";
import { Context, Resolvers } from "../types";
import { Root } from "./uploadPhoto/uploadPhoto.types";


const resolvers: Resolvers = {
    Photo: {
        user: async({ userId } : Root, _, { client } : Context) : Promise<User>  => {
            return await client.user.findUnique({ where: { id: userId }})
        },
        hashtags: async({ id }: Root, _, { client } : Context) : Promise<Hashtag[]> => {
            const tags = await client.photo.findUnique({ where: { id }, select: { hashtags: true } });
            return tags.hashtags
        }
    },

    Hashtag: {
        photos: async({ id }, { lastId }, { client } : Context) => {
            return await client.photo.findMany({ 
                where: { hashtags: { some: { id }}},
                skip: lastId ? 1 : 0,
                take: 9,
                ...(lastId && { cursor: { id: lastId }})
            })
        },
        totalPhotos: async({ id }, _, { client } : Context) => {
            return await client.photo.count({ where: { hashtags: { some: { id }}}})
        }
    } 
}

export default resolvers;