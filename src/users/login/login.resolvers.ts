import * as bcrypt from "bcrypt"
import * as jwt from "jsonwebtoken"
import { Resolvers } from "../../types"


const resolvers: Resolvers = {
    Mutation: {
        login: async (_, { userName, password }, { client }) => {
            
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

export default resolvers;