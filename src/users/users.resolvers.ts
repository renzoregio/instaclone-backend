import { Photo } from "@prisma/client";
import { Context } from "../types/common/context";
import { Resolvers } from "../types/common/resolvers";
import { ComputedFieldsRoot, PhotosArgs } from "../types/users/resolverTypes";

const resolvers: Resolvers = {
    User: {
        totalFollowing: ({ id } : ComputedFieldsRoot, _, { client } : Context) : Promise<number> => {
            return client.user.count({ where: { followers: { some: { id }}}})
        },
        totalFollowers: ({ id } : ComputedFieldsRoot, _, { client } : Context) : Promise<number> => {
            return client.user.count({ where: { following: { some: { id }}}})
        },
        isMyProfile: ({ id } : ComputedFieldsRoot, _, { loggedInUser } : Context) : boolean => {
            return loggedInUser && id === loggedInUser.id;
        },
        isFollowing: async ({ id } : ComputedFieldsRoot, _, { loggedInUser, client } : Context) : Promise<boolean> => {
            if(!loggedInUser && loggedInUser.id === id){
                return false
            }

            const isExists = await client.user.findUnique({where: { id: loggedInUser.id }}).following({ where: { id }})
            
            return isExists.length ? true : false;
        },
        photos: async( { id } : ComputedFieldsRoot, { lastId } : PhotosArgs, { client } : Context) : Promise<Photo[]> => {
            return await client.photo.findMany({ where: { userId: id}, take: 5, skip: lastId ? 1 : 0, ...(lastId && { cursor: { id: lastId }})})
        }
    }
}

export default resolvers;