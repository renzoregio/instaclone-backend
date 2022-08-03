import { User } from "@prisma/client";
import { Context } from "../../types/common/context";
import { Resolvers } from "../../types/common/resolvers";
import { SearchUsersArgs } from "../../types/users/resolverTypes";

const resolvers: Resolvers = {
    Query: {
        searchUsers: async(_, { userName, lastId } : SearchUsersArgs, { client } : Context) : Promise<User[]> => {
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