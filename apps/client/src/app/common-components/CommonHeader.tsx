function CommonHeader({ title, subTitle = '' }: CommonHeaderProps) {
  return (
    <header className='pt-16 pl-16 pr-16 pb-8 text-[#0D1B2A]'>
      <div className='flex flex-col gap-8'>
        <div className='text-5xl font-russo ml-8'>{title}</div>
        {subTitle !== '' && <hr className='border-black' />}
      </div>
      <div
        className={`${subTitle === '' ? 'hidden' : 'mt-8 font-russo text-3xl'}`}
      >
        {subTitle}
      </div>
    </header>
  );
}

export default CommonHeader;
