import { client } from "../../client"
import bcrypt from "bcrypt"

export default {
    Mutation: {
        editProfile: async (_, { firstName, lastName, userName, email, password: newPassword }, context) => {
            try {
                const { loggedInUser } = context

                let hashedPassword = null;

                if (newPassword) {
                    hashedPassword = await bcrypt.hash(newPassword, 10)
                }

                const updatedUser = await client.user.update({
                    where: {
                        id: loggedInUser.id
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