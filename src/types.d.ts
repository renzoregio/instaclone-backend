import { User, PrismaClient } from "@prisma/client"
import { FileUpload } from "graphql-upload"

interface UsersArgs {
    firstName?: string,
    lastName?: string,
    userName?: string,
    email?: string,
    password?: string
    bio?: string,
    avatar?: FileUpload,
    page?: number,
    lastId?: number
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

export type ResolverFn = (root: any, args: UsersArgs, context: Context, info: any) => Promise<ResolverResults> | ResolverResults
export type UserResolverFn = (root: any, args: UsersArgs, context: Context, info: any) => any

export type Resolvers = {
    [key: string]: {
        [key: string]: ResolverFn | UserResolverFn
    }
}