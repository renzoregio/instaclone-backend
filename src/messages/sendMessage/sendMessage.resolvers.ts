import { Context } from "../../types/common/context";
import { Resolvers } from "../../types/common/resolvers";
import { SendMessageArgs } from "../../types/messages/resolverTypes";
import { GenericResolverResults } from "../../types/users/resolverTypes";
import { protectedResolver } from "../../users/users.utils";

const resolvers : Resolvers = {
    Mutation: {
        sendMessage: protectedResolver(async(_, { payload, roomId, userId } : SendMessageArgs, { client, loggedInUser } : Context) : Promise<GenericResolverResults> => {
            let room = null;

            if(userId){
                const userToMessage = await client.user.findUnique({ where: { id: userId }, select: { id: true, followers: { select: { id: true }} }})
                
                if(!userToMessage){
                    return { ok: false, error: "User not found." }
                }

                const isFollowing: {id: number}[] = userToMessage.followers.filter(follower => follower.id === loggedInUser.id)

                if(!isFollowing.length){
                    return { ok: false, error: "You are not following this user. Unable to send message."}
                }

                room = await client.room.create({ data: {
                    users: {
                        connect: [
                            { id: loggedInUser.id },
                            { id: userId }
                        ],
                    }
                }})

            } else if(roomId){

                room = await client.room.findUnique({ where: { id: roomId }, select: { id : true }})

                if(!room){
                    return { ok: false, error: "Room does not exist."}
                }
            }

            await client.message.create({ data: {
                payload,
                room: {
                    connect: {
                        id: room.id 
                    }
                },
                user: {
                    connect: {
                       id: loggedInUser.id 
                    }
                }
            }})
            
            return { ok: true }
        })
    }
}

export default resolvers;