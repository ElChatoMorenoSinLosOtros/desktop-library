function GlobalSearchInput({
  inputValue,
  handleInputChange
}: GlobalSearchInputProps) {
  return (
    <input
      className='col-span-2 bg-[#C8C8C8] w-full text-black/75 font-roboto-mono text-sm font-bold
  py-2 px-4 outline-none placeholder:text-black/50'
      placeholder='Search'
      value={inputValue}
      onChange={handleInputChange}
    />
  );
}

export default GlobalSearchInput;
