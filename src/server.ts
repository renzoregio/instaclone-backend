require('dotenv').config()
import * as express from "express"; 
import { ApolloServer } from "apollo-server-express";
import { resolvers, typeDefs} from "./schema"
import { getUser } from "./users/users.utils";
import { client } from "./client";
import { graphqlUploadExpress } from "graphql-upload";
import { createServer } from "http"
import { makeExecutableSchema } from '@graphql-tools/schema';

import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageLocalDefault,
} from "apollo-server-core";
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';

const startServer = async () => {
    const app = express()
    
    app.use(graphqlUploadExpress())

    const httpServer = createServer(app)

    const schema = makeExecutableSchema({ resolvers, typeDefs })
    // Creating the WebSocket server
    const wsServer = new WebSocketServer({server: httpServer, path: "/graphql"})
    // WebSocketServer starts listening.
    const serverCleanup = useServer({ schema }, wsServer);
    
    const apollo = new ApolloServer({
        schema,
        context: async ({ req }) => {
          return {
            loggedInUser: await getUser(req.headers.authorization),
            client
          }
        },
        plugins: [
          // Proper shutdown for the HTTP server.
          ApolloServerPluginDrainHttpServer({ httpServer }),
          // Proper shutdown for the WebSocket server.
          {
            async serverWillStart() {
              return {
                async drainServer() {
                  serverCleanup.dispose();
                },
              };
            },
          },
          ApolloServerPluginLandingPageLocalDefault({ embed: true }),
        ],
    });
    
    await apollo.start()
    // app.use("/static", express.static("uploads"))
    apollo.applyMiddleware({ app });
    const PORT = process.env.PORT;
    httpServer.listen({ port: PORT }, () => {
        console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`)
    })
}

startServer()

