import { googleHandler } from "@/composables/useGoogleLogin";
import { ActionContext, ActionTree } from "vuex";
import { Mutations, MutationTypes } from "./mutations";
import { RootState } from "./state";

export enum ActionTypes {
  SIGN_WITH_GOOGLE = "SIGN_WITH_GOOGLE",
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
};
