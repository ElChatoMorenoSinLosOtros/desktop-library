import CommonHeader from './CommonHeader';

function GlobalList({ title, children }: GlobalListProps) {
  return (
    <>
      <CommonHeader title={title} />
      <div className='w-full flex justify-center'>
        <div className='w-11/12 border-gray-700 border-[1px]'>{children}</div>
      </div>
    </>
  );
}

export default GlobalList;
