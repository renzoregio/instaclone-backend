import { Message, User } from "@prisma/client";
import { Context } from "../types/common/context";
import { Resolvers } from "../types/common/resolvers";

const resolvers: Resolvers = {

    Room: {
        users: async({ id } : { id: number }, _, { client }: Context ): Promise<User[]> => {
            return await client.room.findUnique({ where: { id }}).users();
        },
        messages: async({ id } : { id: number }, { lastId } : { lastId: number}, { client } : Context): Promise<Message[]> => {
            return await client.message.findMany({ where: { roomId: id }, take: 5, skip: lastId ? 1 : 0, ...(lastId && { cursor : { id : lastId }})})
        },
        // unreadTotal: () => 0 inc
    }

}

export default resolvers;