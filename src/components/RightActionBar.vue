<!--suppress HtmlUnknownTarget -->
<template>
    <div class="right-sidebar">
        <div class="language-selector">
            <multiselect :allowEmpty="false"
                         :option-height="104"
                         :options="languages"
                         :searchable="false"
                         :show-labels="false"
                         label="text"
                         track-by="id"
                         v-model="selectedLanguage">
                <template slot="singleLabel" slot-scope="props">
                    <img :src="props.option.imageSrc" alt="img" class="option__image">
                    <span class="option__desc">
                        <span class="option__title">{{ props.option.text }}</span>
                    </span>
                </template>
                <template slot="option" slot-scope="props">
                    <img :src="props.option.imageSrc" alt="img" class="option__image">
                    <div class="option__desc">
                        <span class="option__title">{{ props.option.text }}</span>
                    </div>
                </template>
            </multiselect>
        </div>
        <div class="logout-wrapper">
            <button @click="logout()" class="btn-logout">
                <font-awesome-icon icon="sign-out-alt"/>
            </button>
        </div>
    </div>
</template>
<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import Multiselect from 'vue-multiselect';
  import {mapGetters} from 'vuex';
  import {GET_LANG_ID, GET_LANGUAGES} from '@/store/types/getterTypes';
  import {Languages} from '@/classes/languages';
  import {ACTION_LANG_ID, ACTION_LOGOUT} from '@/store/types/actionTypes';
  import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';

  @Component({
    components: {Multiselect, FontAwesomeIcon},
    computed: {
      ...mapGetters({
        langID: GET_LANG_ID,
        stateLanguages: GET_LANGUAGES,
      }),
    },
  })
  export default class RightSidebar extends Vue {
    public langID!: number;
    public stateLanguages!: Languages[];

    get languages(): Languages[] {
      return this.stateLanguages.map((lang: Languages): Languages => {
        return {
          ...lang,
          text: lang.id === 0 ? this.$t('languages.english') as string : this.$t('languages.greek') as string,
        };
      });
    }

    get selectedLanguage(): any {
      return this.languages.find((lang: Languages) => lang.id === this.langID);
    }

    set selectedLanguage(lang: any) {
      this.$store.dispatch(ACTION_LANG_ID, lang.id);
      this.$i18n.locale = lang.path;
    }

    public logout(): void {
      this.$store.dispatch(ACTION_LOGOUT);
    }
  }
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"/>
<style lang="css" scoped>
    .right-sidebar {
        display: flex;
        align-items: stretch;
        padding: 0 25px 0 0;
    }

    .language-selector {
        display: flex;
        align-items: center;
        margin: 0 .1rem;
    }
</style>
<style>
    img.option__image {
        width: 16px;
        vertical-align: middle;
        display: inline-block;
        margin-right: 5px;
    }

    .option__desc {
        vertical-align: middle;
        display: inline-block;
        font-size: 14px;
    }

    .logout-wrapper {
        display: flex;
        align-items: center;
        margin: 0 .4rem;
    }

    button.btn-logout {
        background: transparent;
        border: none;
        font-size: 24px;
    }
</style>
