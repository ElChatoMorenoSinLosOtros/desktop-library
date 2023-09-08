function InfoPerson({ title, number, isDouble = false }: InfoPersonProps) {
  return (
    <div className='w-full grid place-content-center'>
      <div className='font-roboto-mono text-xl text-center font-bold'>
        {title}
      </div>
      <div className='font-russo text-7xl text-center'>
        {isDouble ? number.toFixed(2) : number}
      </div>
    </div>
  );
}

export default InfoPerson;
