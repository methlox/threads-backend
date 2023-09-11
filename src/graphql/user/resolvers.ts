import UserService, { CreateUserPayload } from "../../services/user";

const queries = {};
const mutations = {
  createUser: async (_: any, payload: CreateUserPayload) => {
    // return "randomid";
    const res = await UserService.createUser(payload);
    return res.id;
  },
};

export const resolvers = { queries, mutations };
