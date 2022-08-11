import { withFilter } from "graphql-subscriptions";
import { client } from "../../client";
import { NEW_MESSAGE } from "../../constants";
import pubsub from "../../pubsub";
import { Context } from "../../types/common/context";

const resolvers = {
    Subscription: {
        roomUpdates: {
            subscribe: async(root, args: { roomId: number }, context, info) => {
                const ok = await client.room.findUnique({ where: { id: args.roomId }, select: { id: true }})

                if(!ok){
                    throw new Error("Room not found.")
                }

                return withFilter(
                    () => pubsub.asyncIterator(NEW_MESSAGE),
                    (payload, variables) => {
                        const { roomUpdates: { roomId }} = payload
                        return roomId === variables.roomId;
                    }
                )(root, args, context, info);

            }
        }
    }
}

export default resolvers;