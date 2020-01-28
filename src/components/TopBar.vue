<template>
    <div class="topbar">
        <Logo/>
        <h3 class="page-title">
            <div class="burger">
                <button @click="toggleSidebar" class="burger-btn">
                    <span/>
                </button>
            </div>
            {{currentPage}}
        </h3>
        <RightActionBar/>
    </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import Logo from '@/components/Logo.vue';
  import {mapActions} from 'vuex';
  import {TOGGLE_SIDEBAR} from '@/store/types/actionTypes';
  import RightActionBar from '@/components/RightActionBar.vue';
  import {TranslateResult} from 'vue-i18n';

  @Component({
    components: {RightActionBar, Logo},
    methods: {
      ...mapActions({
        toggleSidebar: TOGGLE_SIDEBAR,
      }),
    },
  })
  export default class TopBar extends Vue {
    get currentPage(): TranslateResult {
      if (!this.$route.name) {
        return '';
      }
      return this.$t(`menu.${this.$route.name}`);
    }
  }
</script>


<style lang="css" scoped>
    .topbar {
        display: flex;
        flex-direction: row;
        position: fixed;
        top: 0;
        right: 0;
        left: 0;
        z-index: 97;
        height: 80px;
        transition: all .3s ease;
        transition-property: all;
        transition-duration: 0.3s;
        transition-timing-function: ease;
        transition-delay: 0s;
        background-color: #fff;
        box-shadow: 0 0 40px 0 rgba(82, 63, 105, .1);
    }

    .page-title {
        display: flex;
        align-self: center;
        font-weight: 500;
        font-size: 1.4rem;
        color: #434349;
        margin-left: 25px;
        margin-right: 1rem;
        max-width: 100%;
        text-transform: capitalize;
        flex: 1 auto;
    }

    .burger {
        display: flex;
        justify-content: flex-end;
        margin-right: 5px;
        margin-top: -1px;
    }

    .burger-btn {
        display: inline-block;
        position: relative;
        overflow: hidden;
        margin: 0;
        padding: 0;
        font-size: 0;
        text-indent: -9999px;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        -webkit-box-shadow: none;
        box-shadow: none;
        border-radius: 0;
        border: none;
        cursor: pointer;
        background: 0 0;
        outline: 0 !important;
        width: 26px;
        height: 26px;
        transition: all .4s ease;
    }

    .burger-btn span, .burger-btn span:before, .burger-btn span:after {
        background: #000;
        position: absolute;
        display: block;
        left: 0;
        width: 100%;
        height: 3px;
        content: "";
        transition: all .4s ease;
    }

    .burger-btn span:before {
        top: -8px;
    }

    .burger-btn span:after {
        bottom: -8px;
    }
</style>
