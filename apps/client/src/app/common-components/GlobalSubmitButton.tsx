import Button from './Button';

function GlobalSubmitButton({
  children,
  className = ''
}: GlobalSubmitButtonProps) {
  return (
    <Button
      className={`bg-[#0d1b2a] text-white font-roboto-mono font-bold text-xl ${className} py-2 px-8 rounded-xl`}
      isSubmit
    >
      {children}
    </Button>
  );
}

export default GlobalSubmitButton;
