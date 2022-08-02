import { Resolvers } from "../../types";
import { protectedResolver } from "../../users/users.utils";

 const resolvers: Resolvers = {
    Mutation: {
        uploadPhoto: protectedResolver(async(_, { file, caption }, { loggedInUser, client}) => {
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
                    caption: caption,
                    ...(hashtagArr.length && { hashtags: { connectOrCreate: hashtagArr } } )
                }
            })            
        })
    }
 }

 export default resolvers;