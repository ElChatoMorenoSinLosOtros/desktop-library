import SideBar from '@common-components/side-bar/SideBar';
import DashboardPage from '@pages/dashboard/DashboardPage';
import DeletePage from '@pages/delete/DeletePage';
import FinesManagementPage from '@pages/fines-management/FinesManagementPage';
import LoanManagementPage from '@pages/loan-management/LoanManagementPage';
import LoginPage from '@pages/login/LoginPage';
import LogoutPage from '@pages/logout/LogoutPage';
import MaterialManagementPage from '@pages/material-management/MaterialManagementPage';
import MenuPage from '@pages/menu/MenuPage';
import NotFoundPage from '@pages/not-found/NotFoundPage';
import PersonManagementPage from '@pages/person-management/PersonManagementPage';
import AddPersonPage from '@pages/person-management/pages/add/AddPersonPage';
import PersonInfoPage from '@pages/person-management/pages/info/InfoPersonPage';
import NewDataPersonPage from '@pages/person-management/pages/new-data/NewDataPersonPage';
import ReportsPage from '@pages/reports/ReportsPage';
import ReservationsManagementPage from '@pages/reservations-management/ReservationsManagementPage';
import { Navigate, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className='h-screen grid grid-cols-12 w-screen bg-black'>
      <SideBar />
      <div className='h-screen col-span-9 bg-[#d9d9d9]'>
        <Routes>
          <Route path='*' element={<NotFoundPage />} />
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
          <Route path='/fines-management' element={<FinesManagementPage />} />
          <Route
            path='/reservations-management'
            element={<ReservationsManagementPage />}
          />
          <Route path='/logout' element={<LogoutPage />} />
          <Route path='/delete' element={<DeletePage />} />
          <Route path='/reports' element={<ReportsPage />} />
          <Route
            path='/person-management/new-data/:id'
            element={<NewDataPersonPage />}
          />
          <Route path='/person-management/add' element={<AddPersonPage />} />
          <Route
            path='/person-management/info/:id'
            element={<PersonInfoPage />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
