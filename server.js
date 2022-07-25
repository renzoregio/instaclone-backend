require('dotenv').config()
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { resolvers, typeDefs } from "./schema"
import { getUser } from "./users/users.utils";
import graphqlUploadExpress from "graphql-upload/graphqlUploadExpress.js";

const startServer = async () => {
    const server = new ApolloServer({
        resolvers,
        typeDefs,
        context: async ({ req }) => {
            return {
                loggedInUser: await getUser(req.headers.authorization),
            };
        },
    });

    await server.start()
    const app = express()
    app.use(graphqlUploadExpress());
    server.applyMiddleware({ app });
    const PORT = process.env.PORT;
    app.listen({ port: PORT }, () => {
        console.log(`🚀 Server ready at http://localhost:${PORT}`)
    })
}

startServer()

