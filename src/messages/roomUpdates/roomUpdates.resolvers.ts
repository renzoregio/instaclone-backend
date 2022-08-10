import { NEW_MESSAGE } from "../../constants";
import pubsub from "../../pubsub";

const resolvers = {
    Subscription: {
        roomUpdates: {
            subscribe: () => pubsub.asyncIterator(NEW_MESSAGE)
        }
    }
}

export default resolvers;