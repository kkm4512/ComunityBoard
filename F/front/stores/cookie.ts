// // stores/userStore.js
// import { defineStore } from 'pinia'

// export const useAuthStore = defineStore('user', {
//   // 상태 정의
//   state: () => ({
//     name: 'John Doe',
//     age: 30
//   }),
//   // 액션 정의
//   actions: {
//     updateUser(name:any, age:any) {
//       this.name = name;
//       this.age = age;
//     }
//   },
//   // 게터 정의
//   getters: {
//     userInfo: (state) => `Name: ${state.name}, Age: ${state.age}`
//   }
// });

import { defineStore } from 'pinia'

export const useCookieAccessTokenStore = defineStore("accessToken", {
  state: () => ({
    accessToken: "",
  }),
  actions: {
    updateCookieAccessToken(accessToken: string) {
      this.accessToken = accessToken;
    },
  },
  persist: {
    storage: persistedState.localStorage
  },
});
