import CommonHeader from './CommonHeader';

function GlobalForm({ title, children, subTitle }: GlobalFormProps) {
  return (
    <div className='h-full relative'>
      <CommonHeader title={title} subTitle={subTitle} />
      {children}
    </div>
  );
}

export default GlobalForm;
