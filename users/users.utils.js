import jwt from "jsonwebtoken"
import { client } from "../client";

export const getUser = async (token) => {
    try {
        if (!token) {
            return null;
        }

        const { id } = jwt.verify(token, process.env.SECRET_KEY)
        const loggedInUser = await client.user.findUnique({ where: { id } })

        if (!loggedInUser) {
            return null;
        }

        return loggedInUser;

    } catch (err) {
        return null
    }


}