import { Room } from "@prisma/client";
import { Context } from "../../types/common/context";
import { Resolvers } from "../../types/common/resolvers";
import { SeeRoomsArgs } from "../../types/messages/resolverTypes";
import { protectedResolver } from "../../users/users.utils";

const resolvers : Resolvers = {
    Query: {
        seeRooms: protectedResolver(async(_, { lastId } : SeeRoomsArgs, { client, loggedInUser } : Context) : Promise<Room[]> => {
            return await client.room.findMany({ where: { users: { some: { id: loggedInUser.id }}}, take: 5, skip: lastId ? 1 : 0, ...(lastId && { cursor: { id: lastId }})})
        })
    }
}

export default resolvers;