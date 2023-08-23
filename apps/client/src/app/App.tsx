import DashboardPage from '@pages/dashboard/DashboardPage';
import LoginPage from '@pages/login/LoginPage';
import NotFoundPage from '@pages/not-found/NotFoundPage';
import PersonManagementPage from '@pages/person-management/PersonManagementPage';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();

  return (
    <div className='h-screen grid grid-cols-12 w-screen bg-black'>
      <div className='h-screen col-span-3 bg-[#0d1b2a]'>
        <button
          type='button'
          onClick={() => {
            navigate('/dashboard');
          }}
          className='text-white bg-black p-2'
        >
          Go TO Dashboard
        </button>
        <button
          type='button'
          onClick={() => {
            navigate('/persons-management');
          }}
          className='text-white bg-black p-2'
        >
          Go To personsManagementPage
        </button>
      </div>
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
