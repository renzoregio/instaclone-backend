import { PrismaClient, User } from "@prisma/client";

export interface Context {
    loggedInUser?: User,
    client: PrismaClient
}