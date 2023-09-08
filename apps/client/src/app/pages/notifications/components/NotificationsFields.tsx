function NotificationsFields() {
  return (
    <div
      className='p-5 grid place-items-center grid-cols-6 text-lg font-bold font-roboto-mono
    text-[#1B263B]/60 w-full gap-4'
    >
      <div className='w-full'>ID</div>
      <div className='w-full'>Notification Name</div>
      <div className='w-full'>Notification Type</div>
      <div className='w-full'>Date</div>
      <div className='w-full'>Information</div>
      <div className='w-full'>Seen</div>
    </div>
  );
}

export default NotificationsFields;
