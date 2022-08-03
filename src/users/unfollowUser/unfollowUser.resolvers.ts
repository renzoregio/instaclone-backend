import { Context } from "../../types/common/context";
import { Resolvers } from "../../types/common/resolvers";
import { GenericResolverResults, UnfollowUserArgs } from "../../types/users/resolverTypes";
import { protectedResolver } from "../users.utils";

const resolvers: Resolvers = {
    Mutation: {
        unfollowUser: protectedResolver(async(_, { userName } : UnfollowUserArgs, { loggedInUser, client } : Context) : Promise<GenericResolverResults> => {
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

export default resolvers;