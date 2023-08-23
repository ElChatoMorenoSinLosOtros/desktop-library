function LeftBarComponent() {
  return (
    <div className='h-screen col-span-5 bg-[#0d1b2a] flex flex-col font-russo'>
      <div className='h-3/5 grid place-content-center'>
        <div className='bg-[#D9D9D9] px-11 rounded-full py-5'>
          <img
            className='h-96'
            src='/src/assets/images/logo-wbg.png'
            alt='logo'
          />
        </div>
      </div>
      <div className='grid place-content-center gap-8'>
        <h1 className='text-8xl text-[#D9D9D9] text-center'>The Library</h1>
        <h3 className='text-center text-3xl text-[#D9D9D9]'>Administrator</h3>
      </div>
      <div className='absolute text-[#D9D9D9] text-3xl bottom-0 p-5'>
        <h1>El Chato Moreno y los Otros</h1>
      </div>
    </div>
  );
}

export default LeftBarComponent;
