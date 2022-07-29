import * as jwt from "jsonwebtoken"
import { client } from "../client";
import { ResolverFn } from "../types";

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

export const protectedResolver = (passedResolver: ResolverFn) => (root, args, context, info) => {
    if (!context.loggedInUser) {
        return {
            ok: false,
            error: "Please login to perform action."
        }
    }
    return passedResolver(root, args, context, info)
}