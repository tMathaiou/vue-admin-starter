import {GET_IS_SIDEBAR_OPEN, GET_LANG_ID, GET_LANGUAGES, GET_LOADING, GET_LOGGED_IN} from '@/store/types/getterTypes';
import {State} from '@/store/state';
import {Languages} from '@/classes/languages';

export const appGetters: any = {
  [GET_IS_SIDEBAR_OPEN]: (state: State): boolean => state.isSidebarOpen,
  [GET_LANG_ID]: (state: State): number => state.langID,
  [GET_LOADING]: (state: State): boolean => state.loading,
  [GET_LANGUAGES]: (state: State): Languages[] => state.languages,
  [GET_LOGGED_IN]: (state: State): boolean => state.loggedIn,
};
