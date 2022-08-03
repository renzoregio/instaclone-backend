import { Hashtag } from "@prisma/client";
import { Resolvers } from "../../types/common/resolvers";
import { Context } from "../../types/common/context";
import { SeeHashtagArgs } from "../../types/hashtags/resolverTypes";

const resolvers: Resolvers = {
    Query: {
        seeHashtag: async(_, { hashtag } : SeeHashtagArgs, { client } : Context) : Promise<Hashtag> => {
            return await client.hashtag.findUnique({ where: { hashtag }})
        }
    }
}

export default resolvers;