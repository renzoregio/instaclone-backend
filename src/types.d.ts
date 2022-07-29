import { User, PrismaClient } from "@prisma/client"

interface Context {
    loggedInUser?: User,
    client: PrismaClient
}

interface ResolverResults {
    ok: boolean
    error?: string
}

export type ResolverFn = (root: any, args: any, context: Context, info: any) => any

export type Resolvers = {
    [key: string]: {
        [key: string]: ResolverFn
    }
}