function NotFoundPage() {
  return (
    <div className='grid h-screen w-screen bg-gray-400 place-content-center absolute left-0'>
      <div
        className='p-10 rounded-3xl shadow-2xl text-white font-roboto font-bold
      text-3xl bg-slate-600 w-2/3 m-auto text-center md:text-5xl md:w-auto'
      >
        Page Not Found
      </div>
    </div>
  );
}

export default NotFoundPage;
