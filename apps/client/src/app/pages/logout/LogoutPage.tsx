import LogOutBody from './components/body/LogOutBody';
import LogOutHeader from './components/header/LogOutHeader';

function LogoutPage() {
  return (
    <div className='h-screen flex justify-center place-items-center font-roboto-mono font-bold text-2xl text-white'>
      <div className='w-4/5 bg-[#0d1b2a] grid place-content-center py-20 rounded-3xl gap-16'>
        <LogOutHeader />
        <LogOutBody />
      </div>
    </div>
  );
}

export default LogoutPage;
