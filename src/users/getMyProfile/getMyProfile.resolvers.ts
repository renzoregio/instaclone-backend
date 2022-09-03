import { Resolvers } from "../../types/common/resolvers";
import { protectedResolver } from "../users.utils";

const resolvers : Resolvers = {
    Query: {
        getMyProfile: protectedResolver(async (_, __, { loggedInUser, client }) => {
            return await client.user.findUnique({ where: { id: loggedInUser.id }})
        })
    }
}

export default resolvers;