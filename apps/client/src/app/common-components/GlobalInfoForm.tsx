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
    <div className='flex flex-col h-screen'>
      <CommonHeader title={title} />
      <div className='px-8'>
        <Line />
      </div>
      {children}
    </div>
  );
}

export default GlobalInfoForm;
