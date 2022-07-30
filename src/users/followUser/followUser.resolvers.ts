import { Resolvers } from "../../types"
import { protectedResolver } from "../users.utils"

const resolvers: Resolvers = {
    Mutation: {
        followUser: protectedResolver(async(_, { userName }, { loggedInUser, client }) => {
            try {
                const isExistingUser = await client.user.findUnique({ where: { userName }})

                if(!isExistingUser){
                    throw new Error("User does not exist.")
                }

                await client.user.update({
                    where: {
                        id: loggedInUser.id
                    },
                    data: {
                        following: {
                            connect: {
                                userName
                            }
                        }
                    }
                })

                return { ok: true}
            } catch(err){
                return { ok: false, error: err.message }
            }
        })
    }
}

export default resolvers;