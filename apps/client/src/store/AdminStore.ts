import { create } from 'zustand';

const INITIAL_STATE = {
  admin: {
    name: '',
    email: '',
    role: '',
    accessToken:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY5MzI3NzE5MSwiZXhwIjoxNjkzMzYzNTkxfQ.WsyIxDd8tQpMBmZqBzv1Zq8NYCrn5IUTuG4IMXchhOU'
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
