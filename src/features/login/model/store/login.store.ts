import { defineStore } from 'pinia';
import { type LoginStore } from '../../types';
import { auth } from 'src/shared/api/methods/auth';
import { Notify } from 'quasar';
import { setToken } from 'src/shared/api/methods/token';
import { useQueryCache } from '@pinia/colada';

export const useLoginStore = defineStore('login', {
  state: (): LoginStore => ({
    loginData: {
      email: '',
      password: '',
    },
    btnLoading: false,
  }),
  getters: {
    isLoginDataValid(state) {
      return !!state.loginData.email && !!state.loginData.password;
    },
  },
  actions: {
    async login() {
      try {
        if (!this.isLoginDataValid) return;
        this.btnLoading = true;
        const response = await auth.login(this.loginData);
        setToken(response.accessToken);

        const queryCache = useQueryCache();
        await queryCache.invalidateQueries({ key: ['user', 'me'] });

        return true;
      } catch (error) {
        console.error(error);
        Notify.create({
          message: 'Указаны неверные данные',
          textColor: 'red',
          color: 'white',
        });
        return false;
      } finally {
        this.btnLoading = false;
      }
    },
  },
});
