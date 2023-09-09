import FinesItem from './components/FinesItem';

function FinesList({ fines }: { fines: Fine[] }) {
  return (
    <div
      className={`h-full overflow-auto mt-2 ${
        fines.length > 9 ? 'mr-[-17px]' : ''
      }`}
    >
      <div
        className='h-full flex flex-col
      font-roboto-mono text-sm font-bold w-full gap-y-10'
      >
        {fines.map((fine: Fine) => {
          return <FinesItem key={fine.fineId} fine={fine} />;
        })}
      </div>
    </div>
  );
}

export default FinesList;
