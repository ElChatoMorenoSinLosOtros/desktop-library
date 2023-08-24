function GlobalForm({ title, children, subTitle }: GlobalFormProps) {
  return (
    <>
      <header className='pt-16 pl-16 pr-16 pb-8'>
        <div className='flex flex-col gap-8'>
          <div className='text-5xl font-russo'>{title}</div>
          <hr className='border-black' />
        </div>
        <div className='mt-8 font-russo text-3xl'>{subTitle}</div>
      </header>
      {children}
    </>
  );
}

export default GlobalForm;
