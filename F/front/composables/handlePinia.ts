import type { responseBoard } from "~/types/boardtype";

export const handlePiniaCookie = (useCookieAccessTokenStore: any) => {
  const cookieAccessTokenStore = useCookieAccessTokenStore();
  const accessToken = computed(() => cookieAccessTokenStore.accessToken);
  return {
    cookieAccessTokenStore,
    accessToken,
  };
};

export const handlePiniaboards = (useBoardsStore: any) => {
  const boardsStore = useBoardsStore();
  const boards = computed(() => boardsStore.boards);
  return {
    boardsStore,
    boards,
  };
};

export const handlePiniaPatchState = (usePatchStateStore: any) => {
  const patchStateStore = usePatchStateStore();
  const patchState = computed(() => !patchStateStore.patchState);
  return {
    patchStateStore,
    patchState,
  };
};
