import { Room } from "@prisma/client";
import { Context } from "../../types/common/context";
import { Resolvers } from "../../types/common/resolvers";
import { SeeRoomArgs } from "../../types/messages/resolverTypes";
import { protectedResolver } from "../../users/users.utils";

const resolvers : Resolvers = {
    Query: {
        seeRoom: protectedResolver(async(_, { roomId } : SeeRoomArgs, { client, loggedInUser }: Context) : Promise<Room> => {
            return await client.room.findFirst({ where: { id: roomId, users: { some: { id: loggedInUser.id }} }})
        })
    }
}

export default resolvers;