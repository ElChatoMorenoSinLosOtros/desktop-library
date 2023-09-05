import { create } from 'zustand';

const LOCAL_STORAGE_KEY_TYPE = 'deleteSessionType';

const savedType = localStorage.getItem(LOCAL_STORAGE_KEY_TYPE);

const initialType = savedType || '';
const initialOnClick = () => {};

const useDeleteStore = create<DeleteStore>(set => ({
  type: initialType,
  onClick: initialOnClick,
  setType: ({ type }) =>
    set(state => {
      const updateDelete = { ...state, type };
      localStorage.setItem(LOCAL_STORAGE_KEY_TYPE, JSON.stringify(type));
      return updateDelete;
    }),
  setOnClick: ({ onClick }) =>
    set(state => {
      const updateDelete = { ...state, onClick };
      return updateDelete;
    })
}));

export default useDeleteStore;
