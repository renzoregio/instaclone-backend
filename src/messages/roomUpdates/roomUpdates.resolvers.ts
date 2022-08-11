import { withFilter } from "graphql-subscriptions";
import { client } from "../../client";
import { NEW_MESSAGE } from "../../constants";
import pubsub from "../../pubsub";

const resolvers = {
    Subscription: {
        roomUpdates: {
            subscribe: withFilter(
                () => pubsub.asyncIterator(NEW_MESSAGE),
                (payload, variables) => {
                    const { roomUpdates: { roomId }} = payload
                    return roomId === variables.roomId;
                }
            )
        }
    }
}

export default resolvers;