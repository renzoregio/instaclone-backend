import { Context } from "../../types/common/context";
import { Resolvers } from "../../types/common/resolvers";
import { protectedResolver } from "../../users/users.utils";

const resolvers : Resolvers = {
    Mutation: {
        createComment: protectedResolver( async(_, { photoId, payload }, { client, loggedInUser } : Context) => {
            const ok = await client.photo.findUnique({ where : { id : photoId }, select: { id: true }})
            if(!ok){
                return { ok : false, error: "Photo does not exist." }
            }

            await client.comment.create({ data: { payload,  user: { connect: { id: loggedInUser.id }}, photo: { connect: { id: photoId }}}})
            return { ok: true }
        })
    }
}

export default resolvers;