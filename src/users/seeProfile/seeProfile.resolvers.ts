import { client } from "../../client"
import { Resolvers } from "../../types"

const resolver: Resolvers = {
    Query: {
        seeProfile: async (_, { userName }) => {
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