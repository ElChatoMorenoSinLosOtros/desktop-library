import { useState } from 'react';
import LoginForm from './components/LoginForm';

function RightBarComponent() {
  const [error, setError] = useState('');

  return (
    <div className='h-screen col-span-4 bg-[#d9d9d9] flex justify-center place-items-center font-roboto'>
      <div className='w-3/5 flex flex-col gap-12'>
        <div className='flex flex-col gap-5'>
          <h2 className='font-bold text-5xl'>Welcome Back</h2>
          <h4 className='text-lg'>Enter your credentials</h4>
        </div>
        {error && (
          <div className='bg-red-600 p-3 rounded-lg text-white text-lg font-bold text-center'>
            <h1>{error}</h1>
          </div>
        )}
        <LoginForm setError={setError} />
      </div>
    </div>
  );
}
export default RightBarComponent;
