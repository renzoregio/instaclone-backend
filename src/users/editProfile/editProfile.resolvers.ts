import * as bcrypt from "bcrypt"
import { protectedResolver } from "../users.utils"
import { createWriteStream } from "fs"
import { Resolvers } from "../../types/common/resolvers";
import { Context } from "../../types/common/context";
import { EditProfileArgs, GenericResolverResults } from "../../types/users/resolverTypes";
import { uploadToS3 } from "../../shared/shared.utils";


const resolvers: Resolvers = {
    Mutation: {
        editProfile: protectedResolver(async (_, { firstName, lastName, userName, email, password: newPassword, bio, avatar } : EditProfileArgs, { loggedInUser, client } : Context) : Promise<GenericResolverResults> => {
            try {
                let avatarUrl = null

                if (avatar) {
                    avatarUrl = await uploadToS3(avatar, loggedInUser.id, "avatars")
                    // const { filename, createReadStream } = avatar;
                    // const newFilename = `${loggedInUser.id}-${Date.now()}-${filename}`
                    // const readStream = createReadStream();
                    // const writeSteam = createWriteStream(process.cwd() + "/uploads/" + newFilename)
                    // readStream.pipe(writeSteam);
                    // avatarUrl = `http://localhost:4000/static/${newFilename}`
                }

                let hashedPassword = null;

                if (newPassword) {
                    hashedPassword = await bcrypt.hash(newPassword, 10)
                }

                const updatedUser = await client.user.update({
                    where: {
                        id: loggedInUser.id
                    },
                    data: {
                        firstName, lastName, userName, email, bio,
                        ...(hashedPassword && { password: hashedPassword }),
                        ...(avatarUrl && { avatar: avatarUrl })
                    }
                })

                if (!updatedUser.id) {
                    throw new Error("Could not update profile.")
                }

                return { ok: true }
            } catch (err) {
                return { ok: false, error: err.message }
            }
        })
    }
}

export default resolvers;