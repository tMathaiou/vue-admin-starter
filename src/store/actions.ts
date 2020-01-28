import {ACTION_LANG_ID, ACTION_LOADING, ACTION_LOGOUT, ACTION_TOKEN, TOGGLE_SIDEBAR} from '@/store/types/actionTypes';
import {SET_LANG_ID, SET_LOADING, SET_SIDEBAR_IS_OPEN, SET_TOKEN} from '@/store/types/mutationTypes';

export const appActions: any = {
  [TOGGLE_SIDEBAR]({commit}: { commit: any }): void {
    commit(SET_SIDEBAR_IS_OPEN);
  },
  [ACTION_LANG_ID]({commit}: { commit: any }, langID: number): void {
    commit(SET_LANG_ID, langID);
  },
  [ACTION_LOADING]({commit}: { commit: any }, loading: number): void {
    commit(SET_LOADING, loading);
  },
  [ACTION_TOKEN]({commit}: { commit: any }, token: any): void {
    commit(SET_TOKEN, token);
  },
  [ACTION_LOGOUT]({commit}: { commit: any }): void {
    commit(SET_TOKEN, null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
};
