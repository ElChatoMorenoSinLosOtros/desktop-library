import Button from './Button';

function GlobalButton({
  children,
  className = '',
  onClick
}: GlobalButtonProps) {
  return (
    <Button
      className={`bg-[#0d1b2a] text-white font-roboto-mono font-bold text-xl ${className} py-2 px-8 rounded-xl`}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}

export default GlobalButton;
