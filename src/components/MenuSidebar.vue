<!--suppress CssUnusedSymbol -->
<template>
    <div :class="{hover: isHovering || isSidebarOpen}" @mouseout="isHovering = false"
         @mouseover="isHovering = true"
         class="menu-sidebar">
        <div class="menu-sidebar-wrapper">
            <perfect-scrollbar class="menu-sidebar-scroller">
                <ul class="menu-nav">
                    <li :class="[currentPage.includes(item.name) ? 'active' : '', 'menu-nav-item']" :key="index"
                        v-for="(item, index) in menu"
                        v-if="item.menu">
                        <router-link :to="item.path" class="menu-nav-link">
                            <font-awesome-icon :icon="item.icon"
                                               :style="{color: currentPage.includes(item.name) ? primaryColor : ''}"
                                               class="menu-nav-icon"/>
                            <span :class="{hidden: !isHovering && !isSidebarOpen}" :style="{color: primaryColor}"
                                  class="menu-nav-text">
                                {{$t('menu.' + item.name)}}
                            </span>
                        </router-link>
                    </li>
                </ul>
            </perfect-scrollbar>
        </div>
    </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import {PerfectScrollbar} from 'vue2-perfect-scrollbar';
  import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';
  import {routes} from '@/router';
  import {DefaultConfig} from '@/defaultConfig';
  import {mapGetters} from 'vuex';
  import {GET_IS_SIDEBAR_OPEN} from '@/store/types/getterTypes';

  @Component({
    components: {
      PerfectScrollbar,
      FontAwesomeIcon,
    },
    computed: {
      ...mapGetters({
        isSidebarOpen: GET_IS_SIDEBAR_OPEN,
      }),
    },
  })
  export default class MenuSidebar extends Vue {
    public isSidebarOpen!: boolean;
    public isHovering: boolean = false;
    public primaryColor: string = DefaultConfig.primaryColor;


    get currentPage(): string {
      if (!this.$route.name) {
        return '';
      }
      return this.$route.name;
    }

    get menu(): any[] {
      return routes;
    }
  }
</script>

<style scoped src="vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css"/>
<style lang="css" scoped>
    .menu-sidebar {
        flex: 0 0 auto;
        display: flex;
        flex-direction: column;
        width: 100px;
        transition: all 0.3s ease;
        position: fixed;
        top: 80px;
        bottom: 0;
        left: 0;
        z-index: 98;
        max-width: 100%;
        background-color: #fff;
        box-shadow: 13px -2px 27px -12px rgba(41, 50, 66, 0.075);
    }

    .menu-sidebar-scroller {
        margin: 0;
        padding: 15px 0;
        background-color: #fff;
        position: relative;
        height: 100%;
    }

    .menu-sidebar.hover {
        width: 250px;
        transition: all .3s ease;
    }

    .menu-nav {
        padding: 15px 0;
        margin: 0;
        list-style: none;
    }

    .menu-nav-item {
        position: relative;
        margin: 2px 0;
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        float: none;
        padding: 0;
    }

    .menu-nav-link {
        padding: 17px 32px;
        cursor: pointer;
        min-height: 60px;
        display: flex;
        flex-grow: 1;
        align-items: stretch;
        margin: 0;
        text-decoration: none;
        position: relative;
        outline: 0;
    }

    .menu-nav-icon {
        width: 40%;
        flex: 0 0 35px;
        font-size: 1.6rem;
        display: flex;
        align-items: center;
        line-height: 0;
        color: #b8bac3;
    }

    .menu-nav-text {
        font-weight: 400;
        font-size: 1rem;
        align-items: center;
        flex-grow: 1;
        padding: 0;
        display: flex;
    }

    .menu-nav-text.hidden {
        display: none;
    }

    .menu-nav-item.active {
        transition: background-color .3s;
    }

    .menu-nav-item.active a {
        background-color: #f5f6fc;
    }

</style>
