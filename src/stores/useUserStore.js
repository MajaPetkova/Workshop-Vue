import { defineStore } from 'pinia';
import { getCurrentUser, loginUser } from '../services/auth';
import { getCookie, setCookie } from '../utils/cookieUtils';

const LOGIN_EXPIRATION_MIN = 30;
const COOKIE_NAME = 'userToken';

export const useUserStore = defineStore('userStore', {
  state() {
    return {
      user: null,
    };
  },
  getters: {
    isUserLogged: state => !!state.user?.username,
  },
  actions: {
    async  loginUser(loginData) {
      const profile = await loginUser(loginData, LOGIN_EXPIRATION_MIN);
      if (!profile)
        return false;

      this.user = profile;
      setCookie(COOKIE_NAME, profile.accessToken, LOGIN_EXPIRATION_MIN);
    },
    async reAuthUser() {
      if (this.user)
        return false;

      const persistedUserToken = getCookie(COOKIE_NAME);
      if (!persistedUserToken)
        return false;

      const profile = await getCurrentUser(persistedUserToken);
      if (profile) {
        this.user = profile;
        return true;
      }
      return false;
    },
  },
});
