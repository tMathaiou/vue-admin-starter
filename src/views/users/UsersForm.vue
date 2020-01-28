<template>
    <div class="usersForm">
        <div class="row">
            <div class="col-md-12">
                <div class="portlet">
                    <div class="portlet-header">
                        <div class="portlet-header-title">
                            <h3>{{$t('pages.usersForm.title')}}</h3>
                        </div>
                        <div class="portlet-actions">
                            <router-link :to="'/users'" class="btn btn-sm btn-warning" tag="button">
                                {{$t('commons.cancel')}}
                            </router-link>
                            <button :disabled="$v.user.$invalid" @click="save" class="btn btn-sm btn-primary">
                                {{$t('commons.save')}}
                            </button>
                        </div>
                    </div>
                    <div class="portlet-body">
                        <div class="form-group row">
                            <div class="col-lg-6 col-xl-6">
                                <label class="col-form-label" for="firstName">{{$t('commons.firstName')}}</label>
                                <input :class="{ 'has-error': $v.user.firstName.$invalid }" class="form-control"
                                       id="firstName" type="text" v-model="$v.user.firstName.$model">
                                <span class="error-feed"
                                      v-if="!$v.user.firstName.required">{{$t('validations.required')}}</span>
                            </div>
                            <div class="col-lg-6 col-xl-6">
                                <label class="col-form-label" for="lastName">{{$t('commons.lastName')}}</label>
                                <input :class="{ 'has-error': $v.user.lastName.$invalid }" class="form-control"
                                       id="lastName" type="text" v-model="$v.user.lastName.$model">
                                <span class="error-feed"
                                      v-if="!$v.user.lastName.required">{{$t('validations.required')}}</span>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-lg-6 col-xl-6">
                                <label class="col-form-label" for="email">{{$t('commons.email')}}</label>
                                <input :class="{ 'has-error': $v.user.email.$invalid }" class="form-control"
                                       id="email" type="text" v-model="$v.user.email.$model">
                                <span class="error-feed"
                                      v-if="!$v.user.email.required">{{$t('validations.required')}}</span>
                                <span class="error-feed" v-if="!$v.user.email.email">{{$t('validations.email')}}</span>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-lg-6 col-xl-6">
                                <label class="col-form-label" for="password">{{$t('commons.password')}}</label>
                                <input :class="{ 'has-error': $v.user.password.$invalid }" class="form-control"
                                       id="password" type="password" v-model="$v.user.password.$model">
                                <span class="error-feed"
                                      v-if="!$v.user.password.required">{{$t('validations.required')}}</span>
                                <span class="error-feed" v-if="!$v.user.password.minLength">{{$t('validations.minLength', { value: 6 })}}</span>
                            </div>
                            <div class="col-lg-6 col-xl-6">
                                <label class="col-form-label"
                                       for="confirmPassword">{{$t('commons.confirmPassword')}}</label>
                                <input :class="{ 'has-error': $v.user.confirmPassword.$invalid }" class="form-control"
                                       id="confirmPassword" type="password"
                                       v-model="$v.user.confirmPassword.$model">
                                <span class="error-feed" v-if="!$v.user.confirmPassword.required">{{$t('validations.required')}}</span>
                                <span class="error-feed" v-if="!$v.user.confirmPassword.sameAsPassword">{{$t('validations.confirmPassword')}}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import {User} from '@/classes/user';
  import {email, minLength, required, sameAs} from 'vuelidate/lib/validators';
  import to from '@/helpers/to';
  import {UserService} from '@/services/userService';
  import {SocketService} from '@/services/socketService';
  import {Subscription} from 'rxjs';

  @Component({
    validations() {
      const defaultObj: any = {
        user: {
          firstName: {
            required,
          },
          lastName: {
            required,
          },
          email: {
            required,
            email,
          },
          password: {required: false, minLength: false},
          confirmPassword: {required: false, sameAsPassword: false},
        },
      };

      if (!this.$route.params.id) {
        defaultObj.user.password = {
          required,
          minLength: minLength(6),
        };
        defaultObj.user.confirmPassword = {
          required,
          sameAsPassword: sameAs('password'),
        };
      }

      return defaultObj;
    },
  })
  export default class UsersForm extends Vue {
    public user: User = new User();
    public subscriptions: Subscription[] = [];
    public $v!: any;
    public initiator: boolean = false;

    public async beforeCreate(): Promise<void> {
      if (this.$route.params.id) {
        this.user = await UserService.get(Number(this.$route.params.id));
      }
    }

    public mounted(): void {
      if (this.$route.params.id) {
        const socketService = SocketService.getSocket();
        this.subscriptions.push(socketService.onEvent(`refresh-users-${this.$route.params.id}`).subscribe(async () => {
          if (!this.initiator) {
            this.user = await UserService.get(Number(this.$route.params.id));
            this.$toast.warning(this.$t('messages.already_updated'), {timeout: false} as any);
          }
        }));

        this.subscriptions.push(
          socketService.onEvent(`refresh-users-delete`).subscribe(() => {
            if (!this.initiator) {
              this.$toast.warning(this.$t('messages.entity_deleted'), {timeout: false} as any);
              this.$router.push('/users');
            }
          }),
        );
      }
    }

    public beforeDestroy(): void {
      this.subscriptions.map((sub: Subscription): void => sub.unsubscribe());
    }

    public async save(): Promise<void> {
      let err: any;
      this.initiator = true;
      if (!this.$route.params.id) {
        [err] = await to(UserService.save(this.user));
      } else {
        [err] = await to(UserService.update(Number(this.$route.params.id), this.user));
      }

      if (!err) {
        await this.$router.push({name: 'users'});
      }
    }
  }
</script>
<style scoped>

</style>
