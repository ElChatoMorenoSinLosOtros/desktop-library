import logo from '@images/logo.svg';

function SideBarHeader() {
  return (
    <header className='flex justify-start content-center p-5 font-russo gap-5'>
      <div className=''>
        <img src={logo} alt='logo' className='w-16' />
      </div>
      <div className='text-[#E0E1DD] text-2xl  grid place-content-center'>
        The Library
      </div>
    </header>
  );
}

export default SideBarHeader;
