import { client } from "../client"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


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
        },
        login: async (_, { userName, password }) => {

            const user = await client.user.findUnique({
                where: {
                    userName
                }
            })

            if (!user) {
                return { ok: false, error: "User not found" }
            }

            const isPasswordMatching = await bcrypt.compare(password, user.password)

            if (!isPasswordMatching) {
                return { ok: false, error: "Incorrect password" }
            }

            const token = await jwt.sign({ id: user.id }, process.env.SECRET_KEY)

            return { ok: true, token }
        }
    }
}