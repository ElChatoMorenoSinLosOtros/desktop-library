import Button from '@common-components/Button';

function DeleteButton({ children, onClick, className }: DeleteButtonProps) {
  return (
    <Button
      className={`rounded-2xl px-10 py-5 ${className} w-full`}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}

export default DeleteButton;
