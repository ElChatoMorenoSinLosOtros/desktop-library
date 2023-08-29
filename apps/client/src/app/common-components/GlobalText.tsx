function GlobalText({ title, text }: GlobalTextProps) {
  return (
    <div className='flex flex-col gap-5'>
      <div className='font-bold font-roboto-mono text-xl'>{title}</div>
      <div className='text-lg font-roboto-mono font-bold w-full bg-white py-2 px-4'>
        {text}
      </div>
    </div>
  );
}

export default GlobalText;
