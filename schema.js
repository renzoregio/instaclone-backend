import path from "path"
import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge";

const loadedTypes = loadFilesSync(path.join(__dirname, "/**/*.typeDefs.js"))
const loadedResolvers = loadFilesSync(`${__dirname}/**/*.resolvers.js`)

export const typeDefs = mergeTypeDefs(loadedTypes)
export const resolvers = mergeResolvers(loadedResolvers)

