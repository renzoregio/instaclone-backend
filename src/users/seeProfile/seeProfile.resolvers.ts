import { User } from "@prisma/client";
import { Context } from "../../types/common/context";
import { Resolvers } from "../../types/common/resolvers";
import { SeeProfileArgs } from "../../types/users/resolverTypes";

const resolvers: Resolvers = {
    Query: {
        seeProfile: async (_, { userName } : SeeProfileArgs, { client } : Context) : Promise<User> => {
            try {
                const user = await client.user.findUnique({
                    where: {
                        userName
                    },
                    include: {
                        followers: true,
                        following: true
                    }
                })

                if (!user) {
                    throw new Error("User not found.")
                }

                return user;
            } catch (err) {
                return err;
            }
        }
    }
}

export default resolvers;