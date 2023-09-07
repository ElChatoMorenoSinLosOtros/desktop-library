import ReserveItem from './components/ReserveItem.tsx';

function ReserveList({ reserves }: { reserves: Reserve[] }) {
  return (
    <div
      className={`h-full overflow-auto mt-2 ${
        reserves.length > 9 ? 'mr-[-17px]' : ''
      }`}
    >
      <div
        className='h-full flex flex-col
      font-roboto-mono text-sm font-bold w-full gap-y-10'
      >
        {reserves.map((reserve: Reserve) => {
          return <ReserveItem key={reserve.reserveId} reserve={reserve} />;
        })}
      </div>
    </div>
  );
}

export default ReserveList;
