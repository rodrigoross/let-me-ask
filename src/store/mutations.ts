import { User } from "./types";
import { MutationTree } from "vuex";
import { RootState } from "./state";

export enum MutationTypes {
  SET_USER = "SET_USER",
}

// Mutation types
export type Mutations<S = RootState> = {
  [MutationTypes.SET_USER](state: S, payload: User): void;
};

//Define mutations com tipagem
export const mutations: MutationTree<RootState> & Mutations = {
  [MutationTypes.SET_USER](state: RootState, payload: User) {
    state.user = payload;
  },
};
