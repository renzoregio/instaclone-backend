import RootIsMyComment from "../types/comments/resolverTypes";
import { Context } from "../types/common/context";
import { Resolvers } from "../types/common/resolvers";

const resolvers : Resolvers = {
    Comment: {
        isMyComment: ({ userId } : RootIsMyComment, _, { loggedInUser } : Context) : Boolean => {
            return loggedInUser && userId === loggedInUser.id;
        }
    }
}

export default resolvers;