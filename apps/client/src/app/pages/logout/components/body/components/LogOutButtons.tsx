import Button from '@common-components/Button';

function LogOutButtons({ children, onClick, className }: LogOutButtonsProps) {
  return (
    <Button className={`rounded-2xl px-10 py-5 ${className}`} onClick={onClick}>
      {children}
    </Button>
  );
}

export default LogOutButtons;
