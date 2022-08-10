import { Context } from "../../types/common/context";
import { Resolvers } from "../../types/common/resolvers";
import { protectedResolver } from "../../users/users.utils";

const resolvers : Resolvers = {
    Mutation: {
        readMessage: protectedResolver(async(_, { messageId } : { messageId: number }, { client, loggedInUser } : Context) => {
            const ok = await client.message.findFirst({ where: { id: messageId, room: { users: { some: { id: loggedInUser.id }}}, userId: { not: loggedInUser.id } }, select: { id: true }})
            if(!ok){
                return { ok: false, error: "Message not found." }
            }

            await client.message.update({ where: { id: messageId }, data: { read: true } })

            return { ok: true }
        }) 
    }
}

export default resolvers;