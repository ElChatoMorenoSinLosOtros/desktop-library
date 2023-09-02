function LoanFields() {
  return (
    <div
      className='p-5 grid place-items-center grid-cols-9 text-lg font-bold font-roboto-mono
    text-[#1B263B]/60 w-full gap-4'
    >
      <div className='w-full'>ID</div>
      <div className='w-full'>Material Type</div>
      <div className='w-full'>Title</div>
      <div className='w-full'>Borrower</div>
      <div className='w-full'>Due Date</div>
      <div className='w-full col-span-1'>Status</div>
      <div className='w-full text-center'>Info</div>
      <div className='w-full text-center'>Edit</div>
      <div className='w-full text-center'>Remove</div>
    </div>
  );
}

export default LoanFields;
