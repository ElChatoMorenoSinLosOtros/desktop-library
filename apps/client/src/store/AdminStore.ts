import { create } from 'zustand';

const INITIAL_STATE = {
  admin: {
    name: '',
    email: '',
    role: '',
    accessToken: ''
  }
};

const LOCAL_STORAGE_KEY = 'adminSession';

const saveAdminData = localStorage.getItem(LOCAL_STORAGE_KEY);

const initialAdminState = saveAdminData
  ? (JSON.parse(saveAdminData) as Admin)
  : INITIAL_STATE.admin;

const useAdminStore = create<AdminStore>(set => ({
  admin: initialAdminState,
  setName: ({ name }) => {
    set(state => {
      const updateAdmin = { ...state.admin, name };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updateAdmin));
      return { admin: updateAdmin };
    });
  },
  setEmail: ({ email }) => {
    set(state => {
      const updateAdmin = { ...state.admin, email };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updateAdmin));
      return { admin: updateAdmin };
    });
  },
  setRole: ({ role }) => {
    set(state => {
      const updateAdmin = { ...state.admin, role };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updateAdmin));
      return { admin: updateAdmin };
    });
  },
  setAccessToken: ({ accessToken }) => {
    set(state => {
      const updateAdmin = { ...state.admin, accessToken };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updateAdmin));
      return { admin: updateAdmin };
    });
  },
  setAdmin: ({ admin }) => {
    set({ admin });
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(admin));
  },
  logout: () => {
    set({ ...INITIAL_STATE });
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  }
}));

export default useAdminStore;
