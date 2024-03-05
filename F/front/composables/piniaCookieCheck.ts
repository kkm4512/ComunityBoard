export const piniaCookieCheck = (useCookieAccessTokenStore:any) => {
  const cookieAccessTokenStore = useCookieAccessTokenStore();
  const accessToken = computed(() => cookieAccessTokenStore.accessToken);
  return {
    cookieAccessTokenStore,accessToken
  }
}