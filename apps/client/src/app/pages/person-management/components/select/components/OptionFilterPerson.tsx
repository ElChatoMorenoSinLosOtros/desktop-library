function OptionFilterPerson({
  value,
  children,
  isDisabled = false
}: OptionFilterPerson) {
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

export default OptionFilterPerson;
