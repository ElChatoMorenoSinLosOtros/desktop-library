import SideBar from '@common-components/SideBar';
import DashboardPage from '@pages/dashboard/DashboardPage';
import LoginPage from '@pages/login/LoginPage';
import NotFoundPage from '@pages/not-found/NotFoundPage';
import PersonManagementPage from '@pages/person-management/PersonManagementPage';
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
          <Route path='/dashboard' element={<DashboardPage />} />
          <Route
            path='/persons-management'
            element={<PersonManagementPage />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
