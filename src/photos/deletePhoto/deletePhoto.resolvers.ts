import { Context } from "../../types/common/context";
import { Resolvers } from "../../types/common/resolvers";
import { DeletePhotoArgs } from "../../types/photos/resolverTypes";
import { GenericResolverResults } from "../../types/users/resolverTypes";
import { protectedResolver } from "../../users/users.utils";

 const resolvers : Resolvers = {
    Mutation: {
        deletePhoto: protectedResolver(async(_, { id } : DeletePhotoArgs, { client, loggedInUser } : Context) : Promise<GenericResolverResults> => {
            const photo = await client.photo.findUnique({ where: { id }, select: { userId: true }})

            if(!photo){
                return { ok: false, error: "Photo not found." }
            }

            if(photo.userId !== loggedInUser.id){
                return { ok: false, error: "Not authorized."}
            }

            await client.photo.delete({ where: { id }})

            return { ok: true }
        })
    }
 }

 export default resolvers;