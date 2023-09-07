import { create } from 'zustand';

const INITIAL_STATE = {
  office: ''
};

const LOCAL_STORAGE_KEY = 'officeSession';

const saveOfficeData = sessionStorage.getItem(LOCAL_STORAGE_KEY);

const initialOfficeState = saveOfficeData
  ? (JSON.parse(saveOfficeData) as OfficeName)
  : INITIAL_STATE;

const useOfficeStore = create<OfficeStore>(set => ({
  office: initialOfficeState.office,
  setOffice: ({ office }) =>
    set(state => {
      const updateOffice = { ...state, office };
      sessionStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updateOffice));
      return updateOffice;
    })
}));

export default useOfficeStore;
