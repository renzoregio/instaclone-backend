import { DeleteCommentArgs } from "../../types/comments/resolverTypes";
import { Context } from "../../types/common/context";
import { Resolvers } from "../../types/common/resolvers";
import { GenericResolverResults } from "../../types/users/resolverTypes";
import { protectedResolver } from "../../users/users.utils";

const resolvers : Resolvers = {
    Mutation: {
        deleteComment: protectedResolver(async(_, { id } : DeleteCommentArgs, { client, loggedInUser } : Context) : Promise<GenericResolverResults> => {
            const comment = await client.comment.findUnique({ where: { id }, select: { userId : true }})
            if(!comment){
                return { ok: false, error: "Comment not found." }
            }

            if(comment.userId !== loggedInUser.id){
                return { ok: false, error: "Not authorized." }
            }

            await client.comment.delete({ where: { id }})

            return { ok: true }
        })
    }
}

export default resolvers;