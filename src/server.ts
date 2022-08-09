require('dotenv').config()
import * as express from "express"; 
import { ApolloServer } from "apollo-server-express";
import { resolvers, typeDefs} from "./schema"
import { getUser } from "./users/users.utils";
import { client } from "./client";
import { graphqlUploadExpress } from "graphql-upload";

const startServer = async () => {
    const apollo = new ApolloServer({
        resolvers,
        typeDefs,
        context: async ({ req }) => {
            return {
                loggedInUser: await getUser(req.headers.authorization),
                client
            };
        },
    });

    await apollo.start()
    const app = express()
    app.use(graphqlUploadExpress())
    // app.use("/static", express.static("uploads"))
    apollo.applyMiddleware({ app });
    const PORT = process.env.PORT;
    app.listen({ port: PORT }, () => {
        console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`)
    })
}

startServer()

