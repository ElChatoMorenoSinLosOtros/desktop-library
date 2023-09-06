import logo from '@images/logo-wbg.png';

function LeftBarComponent() {
  return (
    <div className='h-screen col-span-5 bg-[#0d1b2a] flex flex-col font-russo justify-between '>
      <div className='h-2/5 xl:h-full mt-10'>
        <div className='flex h-full p-5 xl:p-8 justify-center content-center'>
          <img
            src={logo}
            alt='logo'
            className='object-cover bg-[#d9d9d9] xl:px-7 xl:py-2 rounded-full px-4 py-1'
          />
        </div>
      </div>
      <div className='grid place-content-center gap-4 h-full'>
        <h1 className='text-6xl lg:text-7xl text-[#D9D9D9] text-center xl:text-8xl'>
          The Library
        </h1>
        <h3 className='text-center text-xl lg:text-2xl xl:text-3xl text-[#D9D9D9]'>
          Administrator
        </h3>
      </div>
      <div className=' text-[#D9D9D9] text-xl lg:text-2xl xl:text-3xl p-5'>
        <h1>El Chato Moreno y los Otros</h1>
      </div>
    </div>
  );
}

export default LeftBarComponent;
