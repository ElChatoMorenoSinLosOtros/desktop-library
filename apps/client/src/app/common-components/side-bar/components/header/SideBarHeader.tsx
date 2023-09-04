import logo from '@images/logo.svg';
import useOfficeStore from '@store/OfficeStore';

function SideBarHeader() {
  const { office } = useOfficeStore(state => state);

  return (
    <header className='flex justify-start content-center p-5 font-russo gap-5'>
      <div className=''>
        <img src={logo} alt='logo' className='w-16' />
      </div>
      <div className='text-[#E0E1DD] text-xl  grid place-content-center'>
        The Library {office ? `- ${office}` : ''}
      </div>
    </header>
  );
}

export default SideBarHeader;
