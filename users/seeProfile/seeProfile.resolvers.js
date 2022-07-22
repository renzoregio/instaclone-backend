import { client } from "../../client"

export default {
    Query: {
        seeProfile: async (_, { userName }) => {
            try {
                const user = await client.user.findUnique({
                    where: {
                        userName
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