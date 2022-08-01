import { Resolvers } from "../types";

const resolvers: Resolvers = {
    User: {
        totalFollowing: ({ id }, _, { client }) => {
            return client.user.count({ where: { followers: { some: { id }}}})
        },
        totalFollowers: ({ id }, _, { client }) => {
            return client.user.count({ where: { following: { some: { id }}}})
        },
        isMyProfile: ({ id }, _, { loggedInUser }) => {
            return loggedInUser && id === loggedInUser.id;
        },
        isFollowing: async ({ id }, _, { loggedInUser, client }) => {
            if(!loggedInUser && loggedInUser.id === id){
                return false
            }

            const isExists = await client.user.findUnique({where: { id: loggedInUser.id }}).following({ where: { id }})
            
            return isExists.length ? true : false;
        }
    }
}

export default resolvers;