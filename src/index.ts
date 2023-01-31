require('dotenv').config()
import {readFileSync} from "fs";
import {Resolvers} from "./resolvers-types";
import {ApolloServer} from "@apollo/server";
import {createAccount, getUserByToken, login} from "./auth";
import {createSheet, getSheets, sheetById} from "./sheets";
import {GraphQLError} from "graphql/error";
import {punch} from "./records";
import express from "express";
import {expressMiddleware} from "@apollo/server/express4";
import cors from 'cors';
import bodyParser from "body-parser";
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import * as http from "http";

const typeDefs = readFileSync('./schema.graphql', {encoding: 'utf-8'});

interface MyContext {
    userId: number
}


function authCheck(context: MyContext) {
    if ((context.userId < 0)) {
        console.log(context.userId)
        throw new GraphQLError('User is not authenticated', {
            extensions: {
                code: 'UNAUTHENTICATED', http: {status: 401},
            },
        });
    }
}

const resolvers: Resolvers<MyContext> = {
    Query: {
        Sheets: (parent, args, context) => {
            authCheck(context);
            return getSheets(context.userId)
        }, Sheet: (parent, args, context) => {
            authCheck(context)
            return sheetById(parseInt(args.sheetId))
        }
    }, Mutation: {
        Login: (parent, args) => {
            return login(args.username, args.password)
        }, CreateAccount: (parent, args) => {
            return createAccount(args.username, args.password)
        }, Sheet: (parent, args, context) => {
            authCheck(context)
            return createSheet(context.userId, args.sheetName, args.Year, args.Month)
                .toString()
        }, Punch: (parent, args, context) => {
            authCheck(context)
            return punch(parseInt(args.sheetId))
                .toString()
        }
    }
}
const app = express()
const httpServer = http.createServer(app);
app.use(cors())
const server = new ApolloServer<MyContext>(
    {typeDefs, resolvers, plugins: [ApolloServerPluginDrainHttpServer({httpServer})],});
server.start()
      .then(() => {
          app.use('/', cors<cors.CorsRequest>(),
                  // 50mb is the limit that `startStandaloneServer` uses, but you may configure this to suit your needs
                  bodyParser.json({limit: '50mb'}), // expressMiddleware accepts the same arguments:
                  // an Apollo Server instance and optional configuration options
                  expressMiddleware(server, {
                      context: async ({req}) => {
                          // Get the user token from the headers.
                          const token = req.headers.authorization;
                          if (!token) {
                              return {userId: -1}
                          }
                          // Try to retrieve a user with the token
                          const userId = await getUserByToken(token)

                          // Add the user to the context
                          return {userId};
                      },
                  }),)
          new Promise<void>((resolve) => httpServer.listen({port: 4000}, resolve)).then(() => {
              console.log(`🚀 Server ready at http://localhost:4000/`);
          })
      })

// startStandaloneServer(server, {
//     listen: {port: 4000},

// })
//     .then(({url}) => console.log(`🚀  Server ready at: ${url}`))




