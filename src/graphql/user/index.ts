// we will import everything about our user in here

import { typeDefs } from "./typedef";
import { queries } from "./queries";
import { mutations } from "./mutations";
import { resolvers } from "./resolvers";

export const User = { typeDefs, queries, mutations, resolvers };