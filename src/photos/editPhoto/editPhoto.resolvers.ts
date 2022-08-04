import { Context } from "../../types/common/context";
import { Resolvers } from "../../types/common/resolvers";
import { EditPhotoArgs } from "../../types/photos/resolverTypes";
import { GenericResolverResults } from "../../types/users/resolverTypes";
import { protectedResolver } from "../../users/users.utils";
import processCaptionHashtags from "../photos.utils";

const resolvers: Resolvers = {
    Mutation: {
        editPhoto: protectedResolver(async(_, { photoId, newCaption } : EditPhotoArgs, { client, loggedInUser }: Context) : Promise<GenericResolverResults> => {
            const previousPhoto = await client.photo.findFirst({ where: { id: photoId, userId: loggedInUser.id }, include: { hashtags: { select: { hashtag: true}}}})

            if(!previousPhoto){
                return { ok: false, error: "Photo not found."}
            }       
            
            await client.photo.update({ where: { id: photoId }, data: { caption: newCaption, hashtags: { disconnect: previousPhoto.hashtags, connectOrCreate: processCaptionHashtags(newCaption)}}})

            return { ok: true }

        })
    }
}

export default resolvers;