import * as bcrypt from "bcrypt"
import { Context } from "../../types/common/context";
import { Resolvers } from "../../types/common/resolvers";
import { CreateAccountArgs, GenericResolverResults } from "../../types/users/resolverTypes";

const resolvers: Resolvers = {
    Mutation: {
        createAccount: async (_, { firstName, lastName, userName, email, password } : CreateAccountArgs, { client } : Context) : Promise<GenericResolverResults> => {
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

export default resolvers;