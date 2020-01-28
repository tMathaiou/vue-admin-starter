<template>
    <div>
        <div id="app" v-if="loggedIn">
            <Loader :color="primaryColor" :loading="loading"/>
            <div id="app-wrapper">
                <menu-sidebar/>
                <div :style="{paddingLeft: isSidebarOpen ? '0px' : '100px'}" class="app-view">
                    <top-bar/>
                    <div :style="{paddingLeft: isSidebarOpen ? '250px' : ''}" class="view-wrapper">
                        <div class="view-container">
                            <router-view/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="!loggedIn">
            <Login/>
        </div>
    </div>
</template>
<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import MenuSidebar from '@/components/MenuSidebar.vue';
  import TopBar from '@/components/TopBar.vue';
  import {mapGetters} from 'vuex';
  import {GET_IS_SIDEBAR_OPEN, GET_LANG_ID, GET_LANGUAGES, GET_LOADING, GET_LOGGED_IN} from '@/store/types/getterTypes';
  import Loader from '@/components/Loader.vue';
  import {DefaultConfig} from '@/defaultConfig';
  import {ACTION_LOADING, ACTION_LOGOUT, ACTION_TOKEN} from '@/store/types/actionTypes';
  import {Languages} from '@/classes/languages';
  import {SocketService} from '@/services/socketService';
  import Login from '@/views/Login.vue';

  @Component({
    components: {Login, Loader, TopBar, MenuSidebar},
    computed: {
      ...mapGetters({
        isSidebarOpen: GET_IS_SIDEBAR_OPEN,
        loading: GET_LOADING,
        languages: GET_LANGUAGES,
        langID: GET_LANG_ID,
        loggedIn: GET_LOGGED_IN,
      }),
    },
  })
  export default class App extends Vue {
    public isSidebarOpen!: boolean;
    public loading!: boolean;
    public loggedIn!: boolean;
    public languages!: Languages[];
    public langID!: number;
    public primaryColor: string = DefaultConfig.primaryColor;

    public beforeCreate(): void {
      this.$store.dispatch(ACTION_TOKEN, localStorage.getItem('token'));
    }

    public mounted(): void {
      (window as any).axios.interceptors.request.use((config: any) => {
        config.headers.authorization = localStorage.getItem('token');
        this.$store.dispatch(ACTION_LOADING, true);
        return config;
      }, (error: any) => {
        this.$store.dispatch(ACTION_LOADING, false);
        return Promise.reject(error);
      });

      (window as any).axios.interceptors.response.use((response: any) => {
        this.$store.dispatch(ACTION_LOADING, false);
        return response;
      }, (error: any) => {
        if (error.response.status === 401 && error.response.config.url !== '/api/auth') {
          this.$toast.error(this.$t('messages.access_denied'));
          this.$store.dispatch(ACTION_LOGOUT);
        }

        if (error.response.data && error.response.data.err) {
          const selectedLanguage: any = this.languages.find((lang: Languages) => lang.id === this.langID);
          this.$toast.error(error.response.data.err[selectedLanguage.path]);
        }
        this.$store.dispatch(ACTION_LOADING, false);
        return Promise.reject(error);
      });

      SocketService.initSocket();
    }
  }
</script>

<style lang="scss" scoped>
    #app {
        flex: 1;
        display: flex;
        flex-direction: column;

        #app-wrapper {
            flex: 1 0 auto;
            display: flex;
            flex-direction: row;
            max-width: 100%;

            .app-view {
                flex: 1 auto;
                min-width: 0;
                display: flex;
                flex-direction: column;
                padding-top: 80px;
                transition: all .3s ease;
                max-width: 100%;
            }
        }

        .view-wrapper {
            flex: 1 0 auto;
            display: flex;
            flex-direction: column;
            padding: 25px 0;
            max-width: 100%;
            transition: padding-left .3s ease-in-out;
        }

        .view-container {
            flex: 1 0 auto;
            max-width: 100%;
            width: 100%;
            margin: 0;
            padding: 0 25px;
        }
    }

</style>
