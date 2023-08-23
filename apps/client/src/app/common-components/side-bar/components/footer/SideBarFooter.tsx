import logOutIcon from '@images/logout-icon.png';
import LogOutButton from './components/LogOutButton';

function SideBarFooter() {
  return (
    <div
      className='absolute bottom-0 p-7 font-roboto text-[#E0E1DD] font-bold text-xl
    w-full grid place-content-center'
    >
      <LogOutButton>
        <img
          src={logOutIcon}
          alt='Log out icon'
          className='w-[50px] h-[50px]'
        />
        <h3>Log out</h3>
      </LogOutButton>
    </div>
  );
}

export default SideBarFooter;
