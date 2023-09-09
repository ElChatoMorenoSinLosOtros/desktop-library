function FinesFields() {
  return (
    <div
      className='p-5 grid place-items-center grid-cols-10 text-lg font-bold font-roboto-mono
    text-[#1B263B]/60 w-full gap-4'
    >
      <div className='w-full'>ID</div>
      <div className='w-full'>Material Type</div>
      <div className='w-full'>Title</div>
      <div className='w-full'>Borrower</div>
      <div className='w-full text-center'>Total Fine</div>
      <div className='w-full text-center'>Pay Fine</div>
      <div className='w-full text-center'>Remove</div>
    </div>
  );
}

export default FinesFields;
