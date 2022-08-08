import * as jwt from "jsonwebtoken"
import { client } from "../client";
import { Context } from "../types/common/context";
import { Resolver } from "../types/common/resolvers";

export const getUser = async (token) => {
    try {
        if (!token) {
            return null;
        }

        const verifiedToken: any = await jwt.verify(token, process.env.SECRET_KEY)
        if("id" in verifiedToken){
            const loggedInUser = await client.user.findUnique({ where: { id: verifiedToken["id"] } })

            if (!loggedInUser) {
                return null;
            }

            return loggedInUser;
        }

        return null;
        

    } catch (err) {
        return null
    }
}

export const protectedResolver = (passedResolver: Resolver) => (root: any, args: any, context: Context, info: any) => {
    if (!context.loggedInUser) {
        const isQuery = info.operation.operation === "query";

        if(isQuery){
            return null
        } 

        return {
            ok: false,
            error: "Please login to perform action."
        }
    }
    return passedResolver(root, args, context, info)
}