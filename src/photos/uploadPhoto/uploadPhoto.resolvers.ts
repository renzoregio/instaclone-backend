import { Photo } from "@prisma/client";
import { UploadPhotoArgs } from "../../types/photos/resolverTypes";
import { protectedResolver } from "../../users/users.utils";
import { Context } from "../../types/common/context";
import { Resolvers } from "../../types/common/resolvers";
import processCaptionHashtags from "../photos.utils";
import { uploadToS3 } from "../../shared/shared.utils";

 const resolvers: Resolvers = {
    Mutation: {
        uploadPhoto: protectedResolver(async(_, { file, caption } : UploadPhotoArgs, { loggedInUser, client } : Context) : Promise<Photo> => {
            let hashtagArr = []
            if(caption){
                hashtagArr = processCaptionHashtags(caption)
            }
            const fileUrl = await uploadToS3(file, loggedInUser.id, "uploads")
            return await client.photo.create({
                data: {
                    user: { connect: { id: loggedInUser.id }},
                    file: fileUrl,
                    caption,
                    ...(hashtagArr.length && { hashtags: { connectOrCreate: hashtagArr } } )
                }
            })            
        })
    }
 }

 export default resolvers;