import * as bcrypt from "bcrypt"
import * as jwt from "jsonwebtoken"
import { Context } from "../../types/common/context"
import { Resolvers } from "../../types/common/resolvers"
import { LoginArgs, LoginResults } from "../../types/users/resolverTypes"


const resolvers: Resolvers = {
    Mutation: {
        login: async (_, { userName, password } : LoginArgs, { client } : Context) : Promise<LoginResults> => {
            
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