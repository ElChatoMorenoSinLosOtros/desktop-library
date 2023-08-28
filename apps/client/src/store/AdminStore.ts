import { create } from 'zustand';

const INITIAL_STATE = {
  admin: {
    name: '',
    email: '',
    role: '',
    accessToken:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY5MzI1NTA4OSwiZXhwIjoxNjkzMzQxNDg5fQ.uMnXWcC9wF9T2gd6u3_Ajwz0I3dz8a4UUKUVKAK8_Ew'
  }
};

const useAdminStore = create<AdminStore>(set => ({
  ...INITIAL_STATE,
  setName: ({ name }) => set(state => ({ admin: { ...state.admin, name } })),
  setEmail: ({ email }) => set(state => ({ admin: { ...state.admin, email } })),
  setRole: ({ role }) => set(state => ({ admin: { ...state.admin, role } })),
  setAccessToken: ({ accessToken }) =>
    set(state => ({ admin: { ...state.admin, accessToken } })),
  setAdmin: ({ admin }) => set({ admin }),
  logout: () => set({ ...INITIAL_STATE })
}));

export default useAdminStore;
