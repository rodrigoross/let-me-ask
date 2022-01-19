import { googleHandler } from "@/composables/useGoogleLogin";
import { auth } from "@/services/firebase";
import { Unsubscribe } from "firebase/auth";
import { ActionContext, ActionTree } from "vuex";
import { Mutations, MutationTypes } from "./mutations";
import { RootState } from "./state";

export enum ActionTypes {
  SIGN_WITH_GOOGLE = "SIGN_WITH_GOOGLE",
  RETRIEVE_SIGNED_USER = "RETRIEVE_SIGNED_USER",
}

// Sobreescreve commit do contexto
// Tipando os commit que podem ser utilizados nas actions se baseando nos tipos das mutations
type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<RootState, RootState>, "commit">;

// Action types
export interface Actions {
  [ActionTypes.SIGN_WITH_GOOGLE]({ commit }: AugmentedActionContext): void;
  [ActionTypes.RETRIEVE_SIGNED_USER]({
    commit,
  }: AugmentedActionContext): Promise<Unsubscribe>;
}

export const actions: ActionTree<RootState, RootState> & Actions = {
  async [ActionTypes.SIGN_WITH_GOOGLE]({ commit }) {
    const response = await googleHandler();

    if (response.user) {
      const { displayName, photoURL, uid } = response.user;

      if (!displayName || !photoURL) {
        throw new Error("Informações da conta Google estão incompletas.");
      }

      commit(MutationTypes.SET_USER, {
        id: uid,
        name: displayName,
        avatar: photoURL,
      });
    }
  },

  async [ActionTypes.RETRIEVE_SIGNED_USER]({ commit }) {
    // const user = state.user;
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const { displayName, photoURL, uid } = user;

        if (!displayName || !photoURL) {
          throw new Error("Informações da conta Google estão incompletas.");
        }

        commit(MutationTypes.SET_USER, {
          id: uid,
          name: displayName,
          avatar: photoURL,
        });
      }
    });

    return unsubscribe;
  },
};
