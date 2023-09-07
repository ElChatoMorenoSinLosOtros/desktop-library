import { create } from 'zustand';

const INITIAL_STATE = {
  admin: {
    name: '',
    email: '',
    role: '',
    accessToken: '',
    actions: {
      menu: []
    }
  }
};

const LOCAL_STORAGE_KEY = 'adminSession';

const saveAdminData = sessionStorage.getItem(LOCAL_STORAGE_KEY);

const initialAdminState = saveAdminData
  ? (JSON.parse(saveAdminData) as Admin)
  : INITIAL_STATE.admin;

const useAdminStore = create<AdminStore>(set => ({
  admin: initialAdminState,
  setName: ({ name }) => {
    set(state => {
      const updateAdmin = { ...state.admin, name };
      sessionStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updateAdmin));
      return { admin: updateAdmin };
    });
  },
  setEmail: ({ email }) => {
    set(state => {
      const updateAdmin = { ...state.admin, email };
      sessionStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updateAdmin));
      return { admin: updateAdmin };
    });
  },
  setRole: ({ role }) => {
    set(state => {
      const updateAdmin = { ...state.admin, role };
      sessionStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updateAdmin));
      return { admin: updateAdmin };
    });
  },
  setAccessToken: ({ accessToken }) => {
    set(state => {
      const updateAdmin = { ...state.admin, accessToken };
      sessionStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updateAdmin));
      return { admin: updateAdmin };
    });
  },
  setAdmin: ({ admin }) => {
    set({ admin });
    sessionStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(admin));
  },
  logout: () => {
    set({ ...INITIAL_STATE });
    sessionStorage.removeItem(LOCAL_STORAGE_KEY);
  }
}));

export default useAdminStore;
