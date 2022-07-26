import { client } from "../../client"
import bcrypt from "bcrypt"
import { protectedResolver } from "../users.utils"
import { createWriteStream, read } from "fs"
export default {
    Mutation: {
        editProfile: protectedResolver(async (_, { firstName, lastName, userName, email, password: newPassword, bio, avatar }, context) => {
            try {
                const { loggedInUser } = context
                let avatarUrl = null

                if (avatar) {
                    const { filename, createReadStream } = await avatar;
                    const newFilename = `${loggedInUser.id}-${Date.now()}-${filename}`
                    const readStream = createReadStream();
                    const writeSteam = createWriteStream(process.cwd() + "/uploads/" + newFilename)
                    readStream.pipe(writeSteam);
                    avatarUrl = `http://localhost:4000/static/${newFilename}`
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