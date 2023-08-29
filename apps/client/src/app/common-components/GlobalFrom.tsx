import CommonHeader from './CommonHeader';

function GlobalForm({ title, children, subTitle }: GlobalFormProps) {
  return (
    <>
      <CommonHeader title={title} subTitle={subTitle} />
      {children}
    </>
  );
}

export default GlobalForm;
