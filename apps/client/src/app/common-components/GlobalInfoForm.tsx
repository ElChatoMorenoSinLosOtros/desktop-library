import CommonHeader from './CommonHeader';
import Line from './Line';

function GlobalInfoForm({
  children,
  title,
  subTitle = ''
}: GlobalInfoFormProps) {
  return (
    <div className='flex flex-col h-screen'>
      <CommonHeader title={title} subTitle={subTitle} />
      <div className='px-8'>{subTitle === '' ? <Line /> : <div />}</div>
      {children}
    </div>
  );
}

export default GlobalInfoForm;
