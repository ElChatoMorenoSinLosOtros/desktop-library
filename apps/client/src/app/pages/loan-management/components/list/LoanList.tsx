import LoanItem from './components/LoanItem';

function LoanList({ loans, isLoading }: { loans: Loan[]; isLoading: boolean }) {
  return (
    <div
      className={`h-full overflow-auto mt-2 ${
        loans.length > 9 ? 'mr-[-17px]' : ''
      }`}
    >
      <div
        className='h-full flex flex-col
      font-roboto-mono text-sm font-bold w-full gap-y-10'
      >
        {!isLoading &&
          loans.map((loan: Loan) => {
            return <LoanItem key={loan.loanId} loan={loan} />;
          })}
      </div>
    </div>
  );
}

export default LoanList;
