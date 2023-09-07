function AdminFields() {
  return (
    <div
      className='p-6 grid place-items-center grid-cols-8 text-lg font-bold font-roboto-mono
    text-[#1B263B]/60 w-full gap-4'
    >
      <div className='w-full'>ID</div>
      <div className='w-full'>Email</div>
      <div className='w-full'>Name</div>
      <div className='w-full'>Role</div>
      <div className='w-full'>Permissions</div>
      <div className='w-full text-center'>Info</div>
      <div className='w-full text-center'>Edit</div>
      <div className='w-full text-center'>Remove</div>
    </div>
  );
}

export default AdminFields;
