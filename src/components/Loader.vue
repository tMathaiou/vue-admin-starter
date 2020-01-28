<template>
    <div class="overlay-wrapper" v-show="loading">
        <div class="v-spinner">
            <div class="v-scale v-scale1" v-bind:style="[spinnerStyle,spinnerDelay1]">
            </div>
            <div class="v-scale v-scale2" v-bind:style="[spinnerStyle,spinnerDelay2]">
            </div>
            <div class="v-scale v-scale3" v-bind:style="[spinnerStyle,spinnerDelay3]">
            </div>
            <div class="v-scale v-scale4" v-bind:style="[spinnerStyle,spinnerDelay4]">
            </div>
            <div class="v-scale v-scale5" v-bind:style="[spinnerStyle,spinnerDelay5]">
            </div>
        </div>
    </div>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';

  @Component
  export default class Loader extends Vue {
    @Prop({default: false}) public readonly loading!: boolean;
    @Prop({default: '#5dc596'}) public  readonly color!: string;
    @Prop({default: '35px'}) public readonly height!: string;
    @Prop({default: '4px'}) public readonly width!: string;
    @Prop({default: '2px'}) public readonly margin!: string;
    @Prop({default: '2px'}) public readonly radius!: string;

    public spinnerStyle = {
      backgroundColor: this.color,
      height: this.height,
      width: this.width,
      margin: this.margin,
      borderRadius: this.radius,
      display: 'inline-block',
      animationName: 'v-scaleStretchDelay',
      animationDuration: '1s',
      animationIterationCount: 'infinite',
      animationTimingFunction: 'cubic-bezier(.2,.68,.18,1.08)',
      animationFillMode: 'both',
    };
    public spinnerDelay1 = {animationDelay: '0.1s'};
    public spinnerDelay2 = {animationDelay: '0.2s'};
    public spinnerDelay3 = {animationDelay: '0.3s'};
    public spinnerDelay4 = {animationDelay: '0.4s'};
    public spinnerDelay5 = {animationDelay: '0.5s'};

  }
</script>

<style>
    .v-spinner {
        text-align: center;
        position: absolute;
        width: 100%;
        top: 50%;
    }

    .overlay-wrapper {
        position: absolute;
        z-index: 999;
        width: 100%;
        height: 100%;
        background: rgba(51, 51, 51, 0.15);
    }

    @-webkit-keyframes v-scaleStretchDelay {
        0%,
        100% {
            -webkit-transform: scaleY(1);
            transform: scaleY(1);
        }
        50% {
            -webkit-transform: scaleY(0.4);
            transform: scaleY(0.4);
        }
    }

    @keyframes v-scaleStretchDelay {
        0%,
        100% {
            -webkit-transform: scaleY(1);
            transform: scaleY(1);
        }
        50% {
            -webkit-transform: scaleY(0.4);
            transform: scaleY(0.4);
        }
    }
</style>
