import Vue from 'vue';
import Vuex from 'vuex';
import {State} from '@/store/state';
import {appMutations} from '@/store/mutations';
import {appActions} from '@/store/actions';
import {appGetters} from '@/store/getters';

Vue.use(Vuex);

export default new Vuex.Store({
  state: new State(),
  getters: appGetters,
  mutations: appMutations,
  actions: appActions,
});
