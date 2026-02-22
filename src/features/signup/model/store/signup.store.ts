import { defineStore } from 'pinia';
import type { SignupStore } from '../../types';
import { emailRules, nameRules, passwordRules } from '../rules';
import { isRulesValid } from 'src/shared/utils';
import { auth } from 'src/shared/api/methods/auth';
import { Notify } from 'quasar';
import { setToken } from 'src/shared/api/methods/token';
import { useQueryCache } from '@pinia/colada';

export const useSignupStore = defineStore('signup', {
  state: (): SignupStore => ({
    signupData: {
      name: '',
      email: '',
      password: '',
      repeatPassword: '',
    },
    isSignupBtnLoading: false,
  }),
  getters: {
    isSignupDataValid(state) {
      const isValidName = isRulesValid(nameRules, state.signupData.name);
      const isValidEmail = isRulesValid(emailRules, state.signupData.email);
      const isValidPassword =
        isRulesValid(passwordRules, state.signupData.password) &&
        state.signupData.password === state.signupData.repeatPassword;

      return isValidName && isValidEmail && isValidPassword;
    },
  },
  actions: {
    async register() {
      try {
        if (!this.isSignupDataValid) return;
        this.isSignupBtnLoading = true;
        const response = await auth.signup(this.signupData);
        setToken(response.accessToken);
        const queryCache = useQueryCache();
        await queryCache.invalidateQueries({ key: ['user', 'me'] });
        return true;
      } catch (error) {
        console.error(error);
        Notify.create({
          message: 'Ошибка регистрации',
          color: 'negative',
        });
        return false;
      } finally {
        this.isSignupBtnLoading = false;
      }
    },
  },
});
