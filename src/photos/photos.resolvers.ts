import { Comment, Hashtag, Photo, User } from "@prisma/client";
import { Resolvers } from "../types/common/resolvers";
import { ArgsPhotos, RootPhotos } from "../types/hashtags/resolverTypes";
import { RootComments, RootHashtags, RootIsMyPhoto, RootLikes, RootUser } from "../types/photos/resolverTypes";
import { Context } from "../types/common/context";


const resolvers: Resolvers = {
    Photo: {
        user: async({ userId } : RootUser, _, { client } : Context) : Promise<User>  => {
            return await client.user.findUnique({ where: { id: userId }})
        },
        hashtags: async({ id }: RootHashtags, _, { client } : Context) : Promise<Hashtag[]> => {
            const tags = await client.photo.findUnique({ where: { id }, select: { hashtags: true } });
            return tags.hashtags
        },
        likes: async({ id } : RootLikes, _, { client } : Context) : Promise<number> => {
            return await client.like.count({ where: { photoId: id }})
        },
        commentCount: async({ id } : RootComments, _, { client }: Context) : Promise<number> => {
            return await client.comment.count({ where: { photoId: id }})
        },
        comments: async({ id }, _, { client } : Context) : Promise<Comment[]> => {
            return await client.comment.findMany({ where: { photoId: id }, include: { user : true }})
        },
        isMyPhoto: ({ userId } : RootIsMyPhoto, _, { loggedInUser } : Context) : Boolean => {
            return loggedInUser && userId === loggedInUser.id
        },
        isLiked: async ({ id: photoId }, _, { loggedInUser, client } : Context) : Promise<Boolean> => {
            if(!loggedInUser){
                return false;
            }

            const ok = await client.like.findUnique({ where: { userId_photoId: {
                userId: loggedInUser.id,
                photoId
            }}, select: { id: true }})

            return ok ? true : false;
        }
    } ,

    Hashtag: {
        photos: async({ id } : RootPhotos, { lastId } : ArgsPhotos, { client } : Context) : Promise<Photo[]> => {
            return await client.photo.findMany({ 
                where: { hashtags: { some: { id }}},
                skip: lastId ? 1 : 0,
                take: 9,
                ...(lastId && { cursor: { id: lastId }})
            })
        },
        totalPhotos: async({ id } : RootPhotos, _, { client } : Context) : Promise<number>  => {
            return await client.photo.count({ where: { hashtags: { some: { id }}}})
        }
    } 
}

export default resolvers;