import { client } from "../../client"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export default {
    Mutation: {
        editProfile: async (_, { firstName, lastName, userName, email, password: newPassword, token }) => {
            try {
                const { id } = jwt.verify(token, process.env.SECRET_KEY)

                if (!id) {
                    throw new Error("Could not update profile.")
                }

                let hashedPassword = null;

                if (newPassword) {
                    hashedPassword = await bcrypt.hash(newPassword, 10)
                }

                const updatedUser = await client.user.update({
                    where: {
                        id
                    },
                    data: {
                        firstName, lastName, userName, email,
                        ...(hashedPassword && { password: hashedPassword })
                    }
                })

                if (!updatedUser.id) {
                    throw new Error("Could not update profile.")
                }

                return { ok: true }
            } catch (err) {
                return { ok: false, error: err.message }
            }
        }
    }
}