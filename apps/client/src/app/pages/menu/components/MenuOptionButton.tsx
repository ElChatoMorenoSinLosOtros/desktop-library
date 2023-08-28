import Button from '@common-components/Button';

function MenuOptionButton({ src, title, navigate }: MenuOptionButtonProps) {
  return (
    <Button
      className='w-[230px] h-[180px] bg-[#182f48] p-5 text-[#E0E1DD] font-roboto-mono text-xl
      flex flex-col gap-2 justify-center items-center font-bold'
      onClick={() => navigate(src)}
    >
      <div className='grid place-content-center'>
        <img
          src={`/src/assets/images${src}.png`}
          alt={title}
          className='h-[120px]'
        />
      </div>
      <h5>{title}</h5>
    </Button>
  );
}

export default MenuOptionButton;
