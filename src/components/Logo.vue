<!--suppress CheckImageSize -->
<template>
    <div :style="{backgroundColor: primaryColor, width:  isSidebarOpen ? '250px' : ''}" class="logo">
        <div class="logo-wrapper">
            <router-link to="/"><img alt="logo" src="../assets/logo.png" width="50"/></router-link>
        </div>
    </div>
</template>
<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import {DefaultConfig} from '@/defaultConfig';
  import {mapGetters} from 'vuex';
  import {GET_IS_SIDEBAR_OPEN} from '@/store/types/getterTypes';

  @Component({
    computed: {
      ...mapGetters({
        isSidebarOpen: GET_IS_SIDEBAR_OPEN,
      }),
    },
  })
  export default class Logo extends Vue {
    public primaryColor: string = DefaultConfig.primaryColor;
    public isSidebarOpen!: boolean;
  }
</script>
<style lang="css" scoped>
    .logo {
        flex: 0 0 auto;
        max-width: 100%;
        width: 100px;
        transition: all .3s ease;
        display: flex;
        flex-direction: row;
        padding: 0 25px;
        height: 80px;
        justify-content: center;
        align-self: center;
    }

    .logo-wrapper {
        display: flex;
        align-self: center;
        justify-content: center;
    }
</style>
