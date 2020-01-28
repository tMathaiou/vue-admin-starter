import {SET_LANG_ID, SET_LOADING, SET_SIDEBAR_IS_OPEN, SET_TOKEN} from '@/store/types/mutationTypes';
import {State} from '@/store/state';

export const appMutations: any = {
  [SET_SIDEBAR_IS_OPEN](state: State): void {
    state.isSidebarOpen = !state.isSidebarOpen;
  },
  [SET_LANG_ID](state: State, langID: number): void {
    state.langID = langID;
  },
  [SET_LOADING](state: State, loading: boolean): void {
    state.loading = loading;
  },
  [SET_TOKEN](state: State, token: string): void {
    state.loggedIn = !!(token);
    state.token = token;
  },
};
