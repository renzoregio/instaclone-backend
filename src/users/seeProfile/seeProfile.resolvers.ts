import { Resolvers } from "../../types"

const resolvers: Resolvers = {
    Query: {
        seeProfile: async (_, { userName }, { client }) => {
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