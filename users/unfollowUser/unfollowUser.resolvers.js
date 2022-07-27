import { client } from "../../client";
import { protectedResolver } from "../users.utils";

export default {
    Mutation: {
        unfollowUser: protectedResolver(async(_, { userName }, { loggedInUser }) => {
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
                            disconnect: {
                                userName
                            }
                        }
                    }
                })

                return { ok: true }

             } catch(err){
                return { ok : false, error: err.message }
             }
        })
    }
}