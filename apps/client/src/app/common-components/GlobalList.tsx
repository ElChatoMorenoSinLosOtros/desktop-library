import CommonHeader from '@common-components/CommonHeader';

function GlobalList({ title, children }: GlobalListProps) {
  return (
    <div className='flex flex-col justify-center h-screen'>
      <CommonHeader title={title} />
      <div className='h-full flex items-center justify-center mb-6 overflow-auto'>
        <div className='w-11/12 border-gray-700 border-[1px] h-full flex  flex-col px-6 py-4 gap-5'>
          {children}
        </div>
      </div>
    </div>
  );
}

export default GlobalList;
