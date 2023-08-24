import Button from '@common-components/Button';

function MaterialSubmitButton({ children }: MaterialSubmitButtonProps) {
  return (
    <Button
      className='bg-[#0D1B2A] py-3 text-white rounded-lg text-lg w-[130px]'
      isSubmit
    >
      {children}
    </Button>
  );
}

export default MaterialSubmitButton;
