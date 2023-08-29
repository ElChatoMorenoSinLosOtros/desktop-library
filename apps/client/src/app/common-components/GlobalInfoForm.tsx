import CommonHeader from './CommonHeader';
import Line from './Line';

function GlobalInfoForm({
  children,
  title
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <>
      <CommonHeader title={title} />
      <div className='px-8'>
        <Line />
      </div>
      {children}
    </>
  );
}

export default GlobalInfoForm;
