import { RootState } from "./state";
import {
  createLogger,
  createStore,
  Store,
  useStore as baseUseStore,
} from "vuex";
import { InjectionKey } from "vue";

import { mutations } from "./mutations";
import { actions } from "./actions";

export const key: InjectionKey<Store<RootState>> = Symbol();

export const store = createStore<RootState>({
  state: {
    user: undefined,
  },
  mutations,
  actions,
  getters: {},
  plugins: [createLogger()],
});

/**
 * Método para já importar store com a key injetada
 */
export function useStore(): Store<RootState> {
  return baseUseStore(key);
}
