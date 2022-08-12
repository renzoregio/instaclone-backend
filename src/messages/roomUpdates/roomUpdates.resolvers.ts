import { User } from "@prisma/client";
import { withFilter } from "graphql-subscriptions";
import { NEW_MESSAGE } from "../../constants";
import pubsub from "../../pubsub";
import { Context } from "../../types/common/context";
import { SubscriptionResolvers } from "../../types/common/resolvers";

const resolvers : SubscriptionResolvers = {
    Subscription: {
        roomUpdates: {
            subscribe: async(root : any, args : { roomId: number }, context : Context, info : any) => {
                const loggedInUser = context.loggedInUser;
                const ok = await context.client.room.findFirst({ where: { id: args.roomId, users: { some: { id: loggedInUser.id }} }, select: { id: true }})
                if(!ok){
                    throw new Error("Room not found.")
                }

                return withFilter(
                    () => pubsub.asyncIterator(NEW_MESSAGE),
                    async (payload : { roomUpdates : { roomId : number }}, variables : { roomId: number }, context: Context) => {
                        const { roomUpdates: { roomId }} = payload
                        if(roomId === variables.roomId){
                            const loggedInUser: User = context.loggedInUser;
                            const room = await context.client.room.findFirst({ where: { id: roomId, users: { some: { id: loggedInUser.id }}}, select: { id: true }})
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