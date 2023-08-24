import Button from '@common-components/Button';

function ItemListButton({ children, onClick }: ItemListButtonProps) {
  return (
    <div
      className='flex justify-center place-items-center w-full hover:bg-[#E0E1DD]/5 hover:border-b-[#E0E1DD]
    hover:border-b-[1px]'
    >
      <Button className='w-3/5 py-5 text-start grid ' onClick={onClick}>
        {children}
      </Button>
    </div>
  );
}

export default ItemListButton;
