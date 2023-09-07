import PrivateOutlet from '@common-components/PrivateOutlet';
import SideBar from '@common-components/side-bar/SideBar';
import AdminPage from '@pages/admin/AdminPage';
import AdminAddPage from '@pages/admin/pages/add/AdminAddPage';
import AdminInfoPage from '@pages/admin/pages/info/AdminInfoPage';
import AdminUpdatePage from '@pages/admin/pages/update/AdminUpdatePage';
import DeletePage from '@pages/delete/DeletePage';
import FinesManagementPage from '@pages/fines-management/FinesManagementPage';
import FinesClientHistoryPage from '@pages/fines-management/client-history/FinesClientHistoryPage';
import LoanManagementPage from '@pages/loan-management/LoanManagementPage';
import AddLoanPage from '@pages/loan-management/pages/add/AddLoanPage';
import UserLoanHistoryPage from '@pages/loan-management/pages/client-history/UserLoanHistoryPage';
import InfoLoanPage from '@pages/loan-management/pages/info/InfoLoanPage';
import UpdateLoanPage from '@pages/loan-management/pages/update/UpdateLoanInfo';
import LoginPage from '@pages/login/LoginPage';
import LogoutPage from '@pages/logout/LogoutPage';
import MaterialManagementPage from '@pages/material-management/MaterialManagementPage';
import AddMaterialPage from '@pages/material-management/pages/add/AddMaterialPage';
import InfoMaterialPage from '@pages/material-management/pages/info/InfoMaterialPage';
import NewDataMaterialPage from '@pages/material-management/pages/update/NewDataMaterialPage';
import MenuPage from '@pages/menu/MenuPage';
import NotificationsPage from '@pages/notifications/NotificationsPage';
import PersonManagementPage from '@pages/person-management/PersonManagementPage';
import AddPersonPage from '@pages/person-management/pages/add/AddPersonPage';
import PersonInfoPage from '@pages/person-management/pages/info/InfoPersonPage';
import NewDataPersonPage from '@pages/person-management/pages/new-data/NewDataPersonPage';
import ReservationsManagementPage from '@pages/reservations-management/ReservationsManagementPage';
import useAuthStore from '@store/AuthStore';
import { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import UpdateReservePage from '@pages/reservations-management/pages/update/UpdateReserveInfo.tsx';
import InfoReservePage from '@pages/reservations-management/pages/info/InfoReservePage.tsx';


function App() {
  const location = useLocation();
  const [isLoginPage, setIsLoginPage] = useState(true);
  const auth = useAuthStore(state => state.auth.isLoggedIn);

  useEffect(() => {
    setIsLoginPage(location.pathname === '/login');
  }, [location.pathname]);

  return (
    <div className='h-screen grid grid-cols-12 w-screen bg-black'>
      <div className={`${isLoginPage ? 'hidden' : 'block'} col-span-3 w-full`}>
        <SideBar />
      </div>
      <div className='h-screen col-span-9 bg-[#d9d9d9]'>
        <Routes>
          <Route

            path='/login'
            element={auth ? <Navigate to='/menu' /> : <LoginPage />}
          />
          <Route element={<PrivateOutlet />}>
            <Route path='*' element={<Navigate to='/menu' />} />
            <Route path='/' element={<Navigate to='/menu' />} />
            <Route path='/admin' element={<AdminPage />} />
            <Route path='/admin/add' element={<AdminAddPage />} />
            <Route path='/admin/info/:id' element={<AdminInfoPage />} />
            <Route path='/admin/update/:id' element={<AdminUpdatePage />} />
            <Route path='/menu' element={<MenuPage />} />
            <Route
              path='/person-management'
              element={<PersonManagementPage />}
            />
            <Route
              path='/material-management'
              element={<MaterialManagementPage />}
            />
            <Route path='/loan-management' element={<LoanManagementPage />} />
            <Route
              path='/loan-management/loan-history/:id'
              element={<UserLoanHistoryPage />}
            />
            <Route path='/loan-management/add' element={<AddLoanPage />} />
            <Route path='/fines-management' element={<FinesManagementPage />} />
            <Route
              path='/fines-management/fine-history/:id'
              element={<FinesClientHistoryPage />}
            />
            <Route
              path='/reservations-management'
              element={<ReservationsManagementPage />}
            />
            <Route path='/logout' element={<LogoutPage />} />
            <Route path='/delete' element={<DeletePage />} />
            <Route path='/notifications' element={<NotificationsPage />} />
            <Route
              path='/person-management/update/:id'
              element={<NewDataPersonPage />}
            />
            <Route path='/person-management/add' element={<AddPersonPage />} />
            <Route
              path='/person-management/info/:id'
              element={<PersonInfoPage />}
            />
            <Route
              path='/material-management/add'
              element={<AddMaterialPage />}
            />
            <Route
              path='/material-management/update/:id'
              element={<NewDataMaterialPage />}
            />
            <Route
              path='/material-management/info/:id'
              element={<InfoMaterialPage />}
            />

            <Route
              path='/loan-management/info/:id'
              element={<InfoLoanPage />}
            />
            <Route
              path='/loan-management/update/:id'
              element={<UpdateLoanPage />}
            />
          </Route>
          <Route path='/loan-management/info/:id' element={<InfoLoanPage />} />
          <Route
            path='/loan-management/update/:id'
            element={<UpdateLoanPage />}
          />
          <Route path='/reservations-management/info/:id' element={<InfoReservePage />} />
          <Route
            path='/reservations-management/update/:id'
            element={<UpdateReservePage />}
          />

        </Routes>
      </div>
    </div>
  );
}

export default App;
