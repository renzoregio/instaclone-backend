import { Resolvers } from "../../types";

const resolvers: Resolvers = {
    Query: {
        searchUsers: async(_, { userName, lastId}, { client }) => {
            const users = await client.user.findMany(
                {   take: 5,
                    skip: lastId ? 1 : 0,
                    ...(lastId && { cursor : { id: lastId }}),
                    where: { userName: { startsWith: userName.toLowerCase() }},
                    orderBy: { id: "asc" }
                })
            return users
        }
    }
}

export default resolvers;