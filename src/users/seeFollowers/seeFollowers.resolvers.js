import { client } from "../../client"

export default {
    Query: {
        seeFollowers: async(_, { userName, page }) => {
            try {
                const isUserExisting = await client.user.findUnique({ where: { userName }, select: { id: true }})
                if(!isUserExisting){
                    throw new Error("User does not exist.")
                }
                const followers = await client.user.findUnique({ where: { userName }}).followers({ skip: (page - 1) * 5, take: 5});
                const totalFollowers = await client.user.count({ where: { following: { some: { userName }}}})
                return {ok : true, followers, totalPages: Math.ceil(totalFollowers / 5)}
            } catch(err){
                return { ok: false, error: err.message }
            }
        }
    }
}