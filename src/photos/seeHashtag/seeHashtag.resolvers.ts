import { Hashtag } from "@prisma/client";
import { Context, Resolvers } from "../../types";
import { Args } from "./seeHashtag.types";

const resolvers: Resolvers = {
    Query: {
        seeHashtag: async(_, { hashtag } : Args, { client } : Context) : Promise<Hashtag> => {
            return await client.hashtag.findUnique({ where: { hashtag }})
        }
    }
}

export default resolvers;