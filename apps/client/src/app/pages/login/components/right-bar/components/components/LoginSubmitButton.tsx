import Button from '@common-components/Button';

function LoginSubmitButton({ children }: LoginSubmitButtonProps) {
  return (
    <Button
      className='w-full bg-[#778da9] py-3 text-white rounded-lg text-lg'
      isSubmit
    >
      {children}
    </Button>
  );
}

export default LoginSubmitButton;
