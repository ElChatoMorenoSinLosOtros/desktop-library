import LeftBarComponent from './components/left-bar/LeftBarComponent';
import RightBarComponent from './components/right-bar/RightBarComponent';

function LoginPage() {
  return (
    <div className='h-screen w-screen grid grid-cols-9 z-10 absolute left-0'>
      <LeftBarComponent />
      <RightBarComponent />
    </div>
  );
}
export default LoginPage;
