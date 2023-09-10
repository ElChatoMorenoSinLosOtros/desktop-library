import ReserveItem from './components/ReserveItem';

function ReserveList({
  reserves,
  isLoading
}: {
  reserves: Reserve[];
  isLoading: boolean;
}) {
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
        {!isLoading &&
          reserves.map((reserve: Reserve) => {
            return <ReserveItem key={reserve.reserveId} reserve={reserve} />;
          })}
      </div>
    </div>
  );
}

export default ReserveList;
