import { create } from 'zustand';

const INITIAL_STATE = {
  isLoggedIn: false
};

const LOCAL_STORAGE_KEY = 'authSession';

const saveAuthData = sessionStorage.getItem(LOCAL_STORAGE_KEY);

const initialAuthState = saveAuthData
  ? (JSON.parse(saveAuthData) as Auth)
  : INITIAL_STATE;

const useAuthStore = create<AuthStore>(set => ({
  auth: initialAuthState,
  login: () => {
    set(state => {
      const updateAuth = { ...state.auth, isLoggedIn: true };
      sessionStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updateAuth));
      return { auth: updateAuth };
    });
  },
  logout: () => {
    set(state => {
      const updateAuth = { ...state.auth, isLoggedIn: false };
      sessionStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updateAuth));
      return { auth: updateAuth };
    });
    sessionStorage.removeItem(LOCAL_STORAGE_KEY);
  }
}));

export default useAuthStore;
