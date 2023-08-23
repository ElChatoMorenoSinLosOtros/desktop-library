import logOutLogo from '@images/log-out.svg';

function LogOutHeader() {
  return (
    <div className='flex flex-col gap-7'>
      <div className='flex justify-center'>
        <img src={logOutLogo} alt='Log out Icon' />
      </div>
      <h2>Are you sure you want to log out?</h2>
    </div>
  );
}

export default LogOutHeader;
