import { Context } from "../../types/common/context";
import { Resolvers } from "../../types/common/resolvers";
import { SearchPhotosArgs } from "../../types/photos/resolverTypes";

const resolvers: Resolvers = {
    Query: {
        searchPhotos: async(_, { keyword, lastId } : SearchPhotosArgs, { client } : Context) => {
            return await client.photo.findMany({ where: { caption: { startsWith: keyword}}, take: 5, skip: lastId ? 1 : 0, ...(lastId && { cursor: { id: lastId }})})
        }
    }
}

export default resolvers