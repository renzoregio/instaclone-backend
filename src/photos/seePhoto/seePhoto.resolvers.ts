import { Photo } from "@prisma/client";
import { Context, Resolvers } from "../../types";
import { Args } from "./seePhoto.types";


const resolvers: Resolvers = {
    Query: {
        seePhoto: async(_, { id } : Args, { client } : Context) => {
            return await client.photo.findUnique({ where: { id }})
        }
    }
}

export default resolvers;