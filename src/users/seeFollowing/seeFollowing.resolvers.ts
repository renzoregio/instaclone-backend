import { Context } from "../../types/common/context";
import { Resolvers } from "../../types/common/resolvers";
import { SeeFollowingArgs, SeeFollowingResults } from "../../types/users/resolverTypes";

const resolvers: Resolvers = {
    Query: {
        seeFollowing: async(_, { userName, lastId } : SeeFollowingArgs, { client } : Context) : Promise<SeeFollowingResults> => {
            try {
                const isExistingUser = await client.user.findUnique({ where: { userName }, select: { id: true }})
                if(!isExistingUser){
                    throw new Error("User does not exist.")
                }

                const following = await client.user.findUnique({ where: { userName }}).following({ 
                    skip: lastId ? 1 : 0,
                    take: 5,
                    ...(lastId && { cursor: { id: lastId }})
                })

                return { ok: true, following}

            } catch(err){
                return { ok: false, error: err.message};
            }         
        }
    }
}

export default resolvers;