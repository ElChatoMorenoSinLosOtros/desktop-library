function NotificationsFields() {
  return (
    <div
      className='p-5 grid place-items-center grid-cols-12 text-lg font-bold font-roboto-mono
    text-[#1B263B]/60 w-full gap-4'
    >
      <div className='w-full'>ID</div>
      <div className='w-full col-span-3'>Name</div>
      <div className='w-full col-span-2'>Type</div>
      <div className='w-full col-span-2'>Date</div>
      <div className='w-full col-span-3'>Information</div>
      <div className='w-full text-center'>Seen</div>
    </div>
  );
}

export default NotificationsFields;
