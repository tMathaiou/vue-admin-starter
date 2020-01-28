<template>
  <div class="home">
    <div class="row">
      <div class="col-md-12">
        <div class="portlet">
          <div class="portlet-header">
            <div class="portlet-header-title">
              <h3>{{$t('pages.home.title')}}</h3>
            </div>
          </div>
          <div class="portlet-body">
            {{$t('pages.home.desc')}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Home extends Vue {}
</script>
<style scoped>

</style>
