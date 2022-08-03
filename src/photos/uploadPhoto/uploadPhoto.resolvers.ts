import { Photo } from "@prisma/client";
import { UploadPhotoArgs } from "../../types/photos/resolverTypes";
import { protectedResolver } from "../../users/users.utils";
import { Context } from "../../types/common/context";
import { Resolvers } from "../../types/common/resolvers";

 const resolvers: Resolvers = {
    Mutation: {
        uploadPhoto: protectedResolver(async(_, { file, caption } : UploadPhotoArgs, { loggedInUser, client } : Context) : Promise<Photo> => {
            let temp = [];
            let hashtagArr = []
            if(caption){
                temp = caption.match(/#[\w]+/g) 
                hashtagArr = temp.map((hashtag) => { 
                    return {
                        where: { hashtag },
                        create: { hashtag }
                    }
                })
            }
            
            return await client.photo.create({
                data: {
                    user: { connect: { id: loggedInUser.id }},
                    file,
                    caption,
                    ...(hashtagArr.length && { hashtags: { connectOrCreate: hashtagArr } } )
                }
            })            
        })
    }
 }

 export default resolvers;