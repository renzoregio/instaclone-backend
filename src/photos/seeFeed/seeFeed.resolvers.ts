import { Photo } from "@prisma/client";
import { Context } from "../../types/common/context";
import { Resolvers } from "../../types/common/resolvers";
import { protectedResolver } from "../../users/users.utils";

const resolvers : Resolvers = {
    Query: {
        seeFeed: protectedResolver(async(_, { lastId }, { loggedInUser, client } : Context) : Promise<Photo[]> => {
            return await client.photo.findMany({ 
                where: { 
                    OR: [
                        { user: { followers: { some: { id: loggedInUser.id }}}},
                        { userId: loggedInUser.id }
                ]},
                orderBy: { createdAt: "desc" },
                take: 5,
                skip: lastId ? 1 : 0,
                ...(lastId && { cursor: { id: lastId }})
            })
        })
    }
}

export default resolvers;