import { Context } from "../../types/common/context";
import { Resolvers } from "../../types/common/resolvers";
import { protectedResolver } from "../../users/users.utils";

const resolvers : Resolvers = {
    Query: {
        seeRooms: protectedResolver(async(_, { lastId }, { client, loggedInUser } : Context) => {
            return await client.room.findMany({ where: { users: { some: { id: loggedInUser.id }}}, take: 5, skip: lastId ? 0 : 1, ...(lastId && { cursor: { id: lastId }})})
        })
    }
}

export default resolvers;