import { Question, User } from "./types";
import { MutationTree } from "vuex";
import { RootState } from "./state";
import { Unsubscribe } from "firebase/auth";

export enum MutationTypes {
  SET_USER = "SET_USER",
  SET_QUESTIONS = "SET_QUESTIONS",
  SET_TITLE = "SET_TITLE",
  SET_ROOM_UNSUBSCRIBE = "SET_ROOM_UNSUBSCRIBE",
}

// Mutation types
export type Mutations<S = RootState> = {
  [MutationTypes.SET_USER](state: S, payload: User): void;
  [MutationTypes.SET_QUESTIONS](state: S, payload: Question[]): void;
  [MutationTypes.SET_TITLE](state: S, payload: string): void;
  [MutationTypes.SET_ROOM_UNSUBSCRIBE](
    state: S,
    unsubscribe: Unsubscribe
  ): void;
};

//Define mutations com tipagem
export const mutations: MutationTree<RootState> & Mutations = {
  [MutationTypes.SET_USER](state: RootState, payload: User) {
    state.user = payload;
  },
  [MutationTypes.SET_QUESTIONS](state: RootState, payload: Question[]) {
    state.questions = payload;
  },
  [MutationTypes.SET_TITLE](state: RootState, payload: string) {
    state.title = payload;
  },
  [MutationTypes.SET_ROOM_UNSUBSCRIBE](state: RootState, payload: Unsubscribe) {
    state.unsubscribe = payload;
  },
};
