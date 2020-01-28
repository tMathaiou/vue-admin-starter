import {DefaultConfig} from '@/defaultConfig';
import {Languages} from '@/classes/languages';

export class State {
  public isSidebarOpen: boolean = DefaultConfig.isSidebarOpen;
  public langID: number = 0;
  public loggedIn: boolean = false;
  public loading: boolean = false;
  public token: string = '';
  public languages: Languages[] = [{
    imageSrc: '/images/260-united-kingdom.svg',
    path: 'en',
    id: 0,
    text: '',
  }, {
    imageSrc: '/images/170-greece.svg',
    path: 'el',
    id: 1,
    text: '',
  }];
}
