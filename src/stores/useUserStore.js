import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { authenticateUser, getCurrentUser } from '../services/auth';
import { getCookie, setCookie } from '../utils/cookieUtils';

const LOGIN_EXPIRATION_MIN = 30;
const COOKIE_NAME = 'userToken';

export const useUserStore = defineStore('userStore', () => {
  const user = ref(null);

  const isUserLogged = computed(() =>
    !!user.value?.username,
  );

  async function loginUser(loginData) {
    const profile = await authenticateUser(loginData, LOGIN_EXPIRATION_MIN);
    if (!profile)
      return false;

    user.value = profile;
    setCookie(COOKIE_NAME, profile.accessToken, LOGIN_EXPIRATION_MIN);
  }
  async function reAuthUser() {
    if (user.value)
      return false;

    const persistedUserToken = getCookie(COOKIE_NAME);
    if (!persistedUserToken)
      return false;

    const profile = await getCurrentUser(persistedUserToken);
    if (profile) {
      user.value = profile;
      return true;
    }
    return false;
  }
  return {
    user,
    isUserLogged,
    reAuthUser,
    loginUser,
  };
});

// export const useUserStore = defineStore('userStore', {
//   state() {
//     return {
//       user: null,
//     };
//   },
//   getters: {
//     isUserLogged: state => !!state.user?.username,
//   },
//   actions: {
//     async  loginUser(loginData) {
//       const profile = await loginUser(loginData, LOGIN_EXPIRATION_MIN);
//       if (!profile)
//         return false;

//       this.user = profile;
//       setCookie(COOKIE_NAME, profile.accessToken, LOGIN_EXPIRATION_MIN);
//     },
//     async reAuthUser() {
//       if (this.user)
//         return false;

//       const persistedUserToken = getCookie(COOKIE_NAME);
//       if (!persistedUserToken)
//         return false;

//       const profile = await getCurrentUser(persistedUserToken);
//       if (profile) {
//         this.user = profile;
//         return true;
//       }
//       return false;
//     },
//   },
// });
