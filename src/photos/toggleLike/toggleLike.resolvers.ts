import { client } from "../../client";
import { Context } from "../../types/common/context";
import { Resolvers } from "../../types/common/resolvers";
import { ToggleLikeArgs } from "../../types/photos/resolverTypes";
import { GenericResolverResults } from "../../types/users/resolverTypes";
import { protectedResolver } from "../../users/users.utils";

 const resolvers : Resolvers = {
    
    Mutation: {
        toggleLike: protectedResolver(async(_, { photoId } : ToggleLikeArgs, { loggedInUser, client } : Context) : Promise<GenericResolverResults> => {
            const photo = await client.photo.findUnique({ where: { id: photoId }})

            if(!photo){
                return { ok : false, error: "Photo does not exist." }
            }

            const like = await client.like.findUnique({ where: { userId_photoId: { userId: loggedInUser.id, photoId }}})
            
            if(like){
                await client.like.delete({ where: { userId_photoId: { userId: loggedInUser.id, photoId }}})
            } else {
                await client.like.create({ data: { user: { connect: { id: loggedInUser.id }}, photo: { connect: { id: photoId }}}})
            }

            return { ok : true } 
        })
    }
 }  

 export default resolvers;