import SideBar from '@common-components/side-bar/SideBar';
import DashboardPage from '@pages/dashboard/DashboardPage';
import DeletePage from '@pages/delete/DeletePage';
import FinesManagementPage from '@pages/fines-management/FinesManagementPage';
import LoanManagementPage from '@pages/loan-management/LoanManagementPage';
import AddLoanPage from '@pages/loan-management/pages/add/AddLoanPage';
import InfoLoanPage from '@pages/loan-management/pages/info/InfoLoanPage';
import UpdateLoanPage from '@pages/loan-management/pages/update/UpdateLoanInfo';
import LoginPage from '@pages/login/LoginPage';
import LogoutPage from '@pages/logout/LogoutPage';
import MaterialManagementPage from '@pages/material-management/MaterialManagementPage';
import AddMaterialPage from '@pages/material-management/pages/add/AddMaterialPage';
import InfoMaterialPage from '@pages/material-management/pages/info/InfoMaterialPage';
import NewDataMaterialPage from '@pages/material-management/pages/update/NewDataMaterialPage';
import MenuPage from '@pages/menu/MenuPage';
import PersonManagementPage from '@pages/person-management/PersonManagementPage';
import AddPersonPage from '@pages/person-management/pages/add/AddPersonPage';
import PersonInfoPage from '@pages/person-management/pages/info/InfoPersonPage';
import NewDataPersonPage from '@pages/person-management/pages/new-data/NewDataPersonPage';
import ReportsPage from '@pages/reports/ReportsPage';
import ReservationsManagementPage from '@pages/reservations-management/ReservationsManagementPage';
import useAdminStore from '@store/AdminStore';
import { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

function App() {
  const admin = useAdminStore(state => state.admin);
  const location = useLocation();
  const [isLoginPage, setIsLoginPage] = useState(true);

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
            path='*'
            element={<Navigate to={`${admin?.email === '' ? '/' : '/menu'}`} />}
          />
          <Route path='/' element={<Navigate to='/login' />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/menu' element={<MenuPage />} />
          <Route path='/dashboard' element={<DashboardPage />} />
          <Route path='/person-management' element={<PersonManagementPage />} />
          <Route
            path='/material-management'
            element={<MaterialManagementPage />}
          />
          <Route path='/loan-management' element={<LoanManagementPage />} />
          <Route path='/loan-management/add' element={<AddLoanPage />} />
          <Route path='/fines-management' element={<FinesManagementPage />} />
          <Route
            path='/reservations-management'
            element={<ReservationsManagementPage />}
          />
          <Route path='/logout' element={<LogoutPage />} />
          <Route path='/delete' element={<DeletePage />} />
          <Route path='/reports' element={<ReportsPage />} />
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

          <Route path='/loan-management/info/:id' element={<InfoLoanPage />} />
          <Route
            path='/loan-management/update/:id'
            element={<UpdateLoanPage />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
