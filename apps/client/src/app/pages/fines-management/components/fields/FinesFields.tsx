function FinesFields() {
  return (
    <div
      className='p-5 grid place-items-center grid-cols-12 text-lg font-bold font-roboto-mono
    text-[#1B263B]/60 w-full gap-4'
    >
      <div className='w-full'>ID</div>
      <div className='w-full col-span-2'>Material Type</div>
      <div className='w-full col-span-2'>Title</div>
      <div className='w-full col-span-2'>Borrower</div>
      <div className='w-full col-span-2'>Total Fine</div>
      <div className='w-full text-center col-span-2'>Pay Fine</div>
      <div className='w-full text-center'>Remove</div>
    </div>
  );
}

export default FinesFields;
