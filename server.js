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
        csrfPrevention: true,
    });

    await server.start()
    const app = express()
    app.use(graphqlUploadExpress());
    server.applyMiddleware({ app });

    await new Promise(r => app.listen({ port: 4000 }, r));
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

startServer()

