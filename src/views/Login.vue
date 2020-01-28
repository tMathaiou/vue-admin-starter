<!--suppress HtmlFormInputWithoutLabel, CheckImageSize -->
<template>
    <div class="login">
        <div class="login-wrapper">
            <div class="login-bg">
                <div class="box">
                    <div class="container">
                        <div class="logo">
                            <img alt="logo" src="../assets/logo.png" width="150px"/>
                        </div>
                        <div class="sign-in">
                            <form @submit="login">
                                <div class="input-group">
                                    <input :placeholder="$t('commons.email')" autocomplete="off" class="form-control"
                                           name="email"
                                           type="text" v-model="email"/>
                                </div>
                                <div class="input-group">
                                    <input :placeholder="$t('commons.password')" class="form-control" name="password"
                                           type="password" v-model="password"/>
                                </div>
                                <div class="login-actions">
                                    <button :disabled="!email || !password" @click="login"
                                            class="btn  btn-pill login-btn">{{$t('commons.sign_in')}}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import to from '@/helpers/to';
  import {LoginService} from '@/services/loginService';
  import {ACTION_TOKEN} from '@/store/types/actionTypes';

  @Component
  export default class Login extends Vue {
    public email: string = '';
    public password: string = '';

    public async login(e: Event): Promise<any> {
      e.preventDefault();
      let err: any;
      let response: any;

      [err, response] = await to(LoginService.login(this.email, this.password));

      if (err) {
        return this.$toast.error(this.$t('commons.wrong_credentials'));
      }

      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));

      await this.$store.dispatch(ACTION_TOKEN, response.token);
    }
  }
</script>
<style scoped>
    .login {
        display: flex;
        flex: 1;
        flex-direction: row;
        min-height: 100vh;
        background: #333;
    }

    .login-wrapper {
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        background-size: cover;
        background-repeat: no-repeat;
    }

    .login-bg {
        flex: 1 0 auto;
        display: flex;
        flex-direction: column;
        max-width: 100%;
    }

    .box {
        flex: 1 0 auto;
        padding: 6% 2rem 1rem 2rem;
        margin: 30% auto 2rem auto;
        overflow: hidden;
        max-width: 100%;
    }

    .container {
        width: 430px;
        margin: 0 auto;
    }

    .logo {
        text-align: center;
        margin: 0 auto 4rem auto;
    }

    .sign-in form {
        margin: 0 auto;
    }

    .input-group {
        padding: 0;
        margin: 0 auto;
    }

    .form-control {
        height: 46px;
        border: none;
        padding-left: 1.5rem;
        padding-right: 1.5rem;
        border-radius: 46px;
        margin-top: 1.5rem;
        background: rgba(255, 255, 255, .15);
        color: #74788d;
    }

    .login-actions {
        text-align: center;
        margin-top: 7%;
    }

    .login-btn, .login-btn:hover {
        height: 50px;
        padding-left: 2.5rem;
        padding-right: 2.5rem;
        color: #fff;
        background-color: #00a3ee;
        border-color: #009ae1;
        border-radius: 2rem;
    }
</style>
