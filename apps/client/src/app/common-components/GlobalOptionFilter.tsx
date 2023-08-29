function GlobalOptionFilter({
  value,
  children,
  isDisabled = false
}: GlobalFilterPerson) {
  return (
    <option
      value={value}
      className='text-sm font-bold font-roboto-mono'
      hidden={isDisabled}
    >
      {children}
    </option>
  );
}

export default GlobalOptionFilter;
