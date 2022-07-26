import bcrypt from "bcrypt"
import { client } from "../../client"

export default {
    Mutation: {
        createAccount: async (_, { firstName, lastName, userName, email, password }) => {
            try {
                const existingUser = await client.user.findFirst({
                    where: {
                        OR: [
                            { userName }, { email }
                        ]
                    }
                })

                if (existingUser) {
                    throw new Error("Username/email already exists.")
                }

                const hashedPassword = await bcrypt.hash(password, 10)

                await client.user.create({
                    data: {
                        firstName, lastName, userName, email, password: hashedPassword
                    }
                })

                return { ok: true }
            } catch (err) {
                return { ok: false, error: err.message };
            }
        }
    }
}