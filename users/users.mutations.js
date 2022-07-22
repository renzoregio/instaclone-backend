import { client } from "../client"
import bcrypt from "bcrypt"


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

                return client.user.create({
                    data: {
                        firstName, lastName, userName, email, password: hashedPassword
                    }
                })
            } catch (err) {
                return err;
            }
        }
    }
}