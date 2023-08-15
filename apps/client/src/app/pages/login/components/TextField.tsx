function TextField({ title, placeholder, type = 'text' }: TextFieldProps) {
  return (
    <div className='flex flex-col gap-1'>
      <div className='text-sm text-slate-600 font-bold'>{title}</div>
      <input
        className='w-[300px] border-gray-500 border-[1px] bg-transparent py-3 px-2 rounded-xl text-white'
        placeholder={placeholder}
        type={type}
      />
    </div>
  );
}
export default TextField;
