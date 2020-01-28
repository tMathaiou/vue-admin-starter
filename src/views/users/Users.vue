<!--suppress HtmlFormInputWithoutLabel -->
<template>
    <div class="users">
        <div class="row">
            <div class="col-md-12">
                <div class="portlet">
                    <div class="portlet-header">
                        <div class="portlet-header-title">
                            <h3>{{$t('pages.users.title')}}</h3>
                        </div>
                        <div class="portlet-actions">
                            <router-link :to="'/users/new'" class="btn btn-sm btn-primary" tag="button">
                                {{$t('commons.add_new')}}
                            </router-link>
                        </div>
                    </div>
                    <div class="portlet-body">
                        <div class="table-responsive">
                            <table class="table">
                                <thead>
                                <tr>
                                    <th>{{$t('commons.id')}}</th>
                                    <th>{{$t('commons.firstName')}}</th>
                                    <th>{{$t('commons.lastName')}}</th>
                                    <th>{{$t('commons.email')}}</th>
                                    <th class="text-center">{{$t('commons.actions')}}</th>
                                </tr>
                                <tr>
                                    <td><input @input="debounceInput" class="form-control" type="text"
                                               v-model="filter.user_id"/></td>
                                    <td><input @input="debounceInput" class="form-control" type="text"
                                               v-model="filter.user_firstName"/></td>
                                    <td><input @input="debounceInput" class="form-control" type="text"
                                               v-model="filter.user_lastName"/></td>
                                    <td><input @input="debounceInput" class="form-control" type="text"
                                               v-model="filter.user_email"/></td>
                                    <td class="text-center">
                                        <button @click="clearFilters" class="btn btn-sm btn-primary">
                                            {{$t('commons.clear_filters')}}
                                        </button>
                                    </td>
                                </tr>
                                </thead>
                                <tbody>
                                <tr :key="index" v-for="(user, index) in users">
                                    <td>{{user.id}}</td>
                                    <td>{{user.firstName}}</td>
                                    <td>{{user.lastName}}</td>
                                    <td>{{user.email}}</td>
                                    <td class="text-center actions-td">
                                        <router-link :to="'/users/' + user.id" class="btn btn-sm btn-primary">
                                            <font-awesome-icon icon="edit"/>
                                        </router-link>
                                        <button @click="deleteUser(user)" class="btn btn-sm btn-danger">
                                            <font-awesome-icon icon="trash-alt"/>
                                        </button>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                            <div class="text-right">
                                <paginate
                                        :click-handler="nextPage"
                                        :containerClass="'pagination'"
                                        :next-text="$t('commons.next')"
                                        :page-count="Math.ceil(totalItems / limit)"
                                        :prev-text="$t('commons.prev')">
                                </paginate>
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
  import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';
  import {User} from '@/classes/user';
  import {UserService} from '@/services/userService';
  import {QueryParams} from '@/classes/queryParams';
  import {List} from '@/classes/list';
  import to from '@/helpers/to';
  import {SocketService} from '@/services/socketService';
  import {Subscription} from 'rxjs';
  import Paginate from 'vuejs-paginate';
  import {debounce} from 'debounce';
  import {DefaultConfig} from '@/defaultConfig';

  @Component({
    components: {FontAwesomeIcon, Paginate},
    methods: {
      debounceInput: debounce(function(this: any): void {
        this.fetchUsers();
      }, DefaultConfig.debounceTime),
    } as any,
  })
  export default class Users extends Vue {
    public users: User[] = [];
    public totalItems: number = 0;
    public limit: number = 20;
    public debounceInput!: any;
    public filter: {
      user_id: number | null;
      user_firstName: string | null;
      user_lastName: string | null;
      user_email: string | null;
    } = {
      user_id: null,
      user_firstName: null,
      user_lastName: null,
      user_email: null,
    };
    public subscriptions: Subscription[] = [];

    public async created(): Promise<void> {
      const socketService = SocketService.getSocket();
      await this.fetchUsers();
      this.subscriptions.push(socketService.onEvent('refresh-users').subscribe(() => this.fetchUsers()));
    }

    public async fetchUsers(page: number = 1): Promise<void> {
      let response: any;
      response = await UserService.list(new QueryParams({
        limit: this.limit,
        page,
        filter: this.filter,
      }));
      this.setUsers(response);
    }

    public beforeDestroy(): void {
      this.subscriptions.map((sub: Subscription): void => sub.unsubscribe());
    }

    public clearFilters(): void {
      this.filter = {
        user_id: null,
        user_firstName: null,
        user_lastName: null,
        user_email: null,
      };
      this.fetchUsers();
    }

    public setUsers(usersList: List<User>): void {
      this.users = usersList.rows;
      this.totalItems = usersList.count;
    }

    public nextPage(page: number): void {
      this.fetchUsers(page);
    }

    public async deleteUser(user: User): Promise<any> {
      const swalOptions: any = {
        title: this.$t('commons.delete_title'),
        text: this.$t('commons.cant_revert'),
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: this.$t('commons.accept_delete'),
        cancelButtonText: this.$t('commons.cancel'),
        reverseButtons: true,
      };
      const {value} = await this.$swal(swalOptions);

      if (value) {
        let err: any;
        [err] = await to(UserService.delete(user.id));

        if (err) {
          const swalOptionsErr: any = {
            title: 'Error',
            text: err,
          };
          return this.$swal(swalOptionsErr);
        }
      }
    }
  }

</script>
<style scoped>
    .table td, .table th {
        vertical-align: top;
        border-top: 0;
        font-weight: 500;
        color: #74788d;
        padding: .75rem;
    }

    .table tbody tr {
        border-bottom: 1px dashed #ebedf2;
    }
</style>
