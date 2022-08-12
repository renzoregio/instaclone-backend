import { Context } from "./context"

export type Resolver = (root: any, args: any, context: Context, info: any) => any;

export type Resolvers = {
    [key: string]: {
        [key: string]: (root: any, args: any, context: Context, info: any) => any;
    }
}

export type SubscriptionResolvers = {
    "Subscription": {
        [key : string]: {
            "subscribe": any
        }
    }
}