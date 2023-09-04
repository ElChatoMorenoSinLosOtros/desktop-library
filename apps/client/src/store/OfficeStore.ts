import { create } from 'zustand';

const INITIAL_STATE = {
  office: ''
};

const useOfficeStore = create<OfficeStore>(set => ({
  ...INITIAL_STATE,
  setOffice: ({ office }) => set(state => ({ ...state, office }))
}));

export default useOfficeStore;
