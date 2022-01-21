import { googleHandler } from "@/composables/useGoogleLogin";
import { auth, database } from "@/services/firebase";
import { Unsubscribe } from "firebase/auth";
import { onValue, ref } from "firebase/database";
import { ActionContext, ActionTree } from "vuex";
import { Mutations, MutationTypes } from "./mutations";
import { RootState } from "./state";
import { FirebaseQuestions, Question } from "./types";

export enum ActionTypes {
  SIGN_WITH_GOOGLE = "SIGN_WITH_GOOGLE",
  RETRIEVE_SIGNED_USER = "RETRIEVE_SIGNED_USER",
  RETRIEVE_ROOM_DATA = "RETRIEVE_ROOM_DATA",
  UNSUBSCRIBE_ROOM_LISTENER = "UNSUBSCRIBE_ROOM_LISTENER",
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
  [ActionTypes.RETRIEVE_ROOM_DATA](
    { commit, state }: AugmentedActionContext,
    roomId: string
  ): void;
  [ActionTypes.UNSUBSCRIBE_ROOM_LISTENER]({
    state,
  }: ActionContext<RootState, RootState>): void;
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

  async [ActionTypes.RETRIEVE_ROOM_DATA]({ commit, state }, roomId) {
    const roomRef = ref(database, `rooms/${roomId}`);

    return new Promise((resolve) => {
      const unsubscribeRoomListener = onValue(roomRef, (room) => {
        const roomData = room.val();

        const firebaseQuestions: FirebaseQuestions = roomData.questions ?? {};

        //mapeia perguntas em array.
        const parsedQuestions: Question[] = Object.entries(
          firebaseQuestions
        ).map(([key, question]) => {
          return {
            id: key,
            author: question.author,
            content: question.content,
            isAnswered: question.isAnswered,
            isHighlighted: question.isHighlighted,
            likeCount: Object.values(question.likes ?? {}).length,
            likeId: Object.entries(question.likes ?? {}).find(
              ([key, like]) => like.authorId === state.user?.id
            )?.[0],
          };
        });

        commit(MutationTypes.SET_TITLE, roomData.title);
        commit(MutationTypes.SET_QUESTIONS, parsedQuestions);
        resolve(roomData);
      });

      commit(MutationTypes.SET_ROOM_UNSUBSCRIBE, unsubscribeRoomListener);
    });
  },

  [ActionTypes.UNSUBSCRIBE_ROOM_LISTENER]({ state }) {
    if (state.unsubscribe) {
      state.unsubscribe();
    }
  },
};
