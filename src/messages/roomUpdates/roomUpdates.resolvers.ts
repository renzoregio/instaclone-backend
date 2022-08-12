import { User } from "@prisma/client";
import { withFilter } from "graphql-subscriptions";
import { client } from "../../client";
import { NEW_MESSAGE } from "../../constants";
import pubsub from "../../pubsub";
import { Context } from "../../types/common/context";

const resolvers = {
    Subscription: {
        roomUpdates: {
            subscribe: async(root, args: { roomId: number }, context, info) => {
                const loggedInUser: User = context.loggedInUser;
                const ok = await client.room.findFirst({ where: { id: args.roomId, users: { some: { id: loggedInUser.id }} }, select: { id: true }})
                if(!ok){
                    throw new Error("Room not found.")
                }

                return withFilter(
                    () => pubsub.asyncIterator(NEW_MESSAGE),
                    async (payload, variables, context: { loggedInUser: User }) => {
                        const { roomUpdates: { roomId }} = payload
                        if(roomId === variables.roomId){
                            const loggedInUser: User = context.loggedInUser;
                            const room = await client.room.findFirst({ where: { id: roomId, users: { some: { id: loggedInUser.id }}}, select: { id: true }})
                            if(room){
                                return true
                            }
                        }

                        return false
                    }
                )(root, args, context, info);

            }
        }
    }
}

export default resolvers;