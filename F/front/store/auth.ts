export const useAuthStore = () => useState('auth', () => ({
  isAuthenticated: false
}));