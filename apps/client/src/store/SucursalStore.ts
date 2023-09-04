import { create } from 'zustand';

const INITIAL_STATE = {
  sucursal: ''
};

const useSucursalStore = create<SucursalStore>(set => ({
  ...INITIAL_STATE,
  setSucursal: ({ sucursal }) => set(state => ({ ...state, sucursal }))
}));

export default useSucursalStore;
