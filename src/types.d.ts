import { User, PrismaClient } from "@prisma/client"
import { FileUpload, Upload } from "graphql-upload"

interface Args {
    firstName?: string,
    lastName?: string,
    userName?: string,
    email?: string,
    password?: string
    bio?: string,
    avatar?: FileUpload,
    page?: number,
    lastId?: number,
    file?: string,
    caption?: string
}


interface UsersRootArg {
    id: number,
    userName: string,
    email: string
}
export interface Context {
    loggedInUser?: User,
    client: PrismaClient
}

interface ResolverResults {
    ok: boolean,
    error?: string,
    token?: string,
    following?: User[],
    followers?: User[],
    totalPages?: number
}

export type ResolverFn = (root: UsersRootArg, args: Args, context: Context, info: any) => Promise<ResolverResults> | ResolverResults
export type UserResolverFn = (root: UsersRootArg, args: Args, context: Context, info: any) => any



export type Resolvers = {
    [key: string]: {
        [key: string]: ResolverFn | UserResolverFn
    }
}