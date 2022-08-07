import { Context } from "../../types/common/context";
import { Resolvers } from "../../types/common/resolvers";
import { SeePhotoCommentsArgs, SeePhotoCommentsResults } from "../../types/photos/resolverTypes";

const resolvers : Resolvers = {
    Query: {
        seePhotoComments: async(_, { id, lastId } : SeePhotoCommentsArgs, { client } : Context) : Promise<SeePhotoCommentsResults[]> => {
            const comments = await client.photo.findUnique({ where: { id }, select: { comments: { select: { payload: true, user: true, id: true, userId: true}, orderBy: { createdAt: "asc" } , take: 5, skip: lastId ? 1 : 0, ...(lastId && { cursor: { id: lastId }})}}})
            return comments.comments
        }
    }
}

export default resolvers;