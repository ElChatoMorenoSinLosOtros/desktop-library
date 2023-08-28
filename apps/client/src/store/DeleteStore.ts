import { create } from 'zustand';

const INITIAL_STATE = {
  type: '',
  onClick: () => {}
};

const useDeleteStore = create<DeleteStore>(set => ({
  ...INITIAL_STATE,
  setType: ({ type }) => set(state => ({ ...state, type })),
  setOnClick: ({ onClick }) => set(state => ({ ...state, onClick }))
}));

export default useDeleteStore;
