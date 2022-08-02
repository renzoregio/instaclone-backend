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
    }
}

export default resolvers;