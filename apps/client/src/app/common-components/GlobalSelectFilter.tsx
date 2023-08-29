import OptionFilterPerson from './GlobalOptionFilter';

function GlobalSelectFilter({
  handleSelectChange,
  defaultValue,
  options
}: GlobalSelectFilterProps) {
  return (
    <select
      onChange={handleSelectChange}
      className='border-transparent outline-none bg-[#C8C8C8] py-2 px-4
    text-sm font-bold font-roboto-mono text-black/50'
      required
      defaultValue={defaultValue}
    >
      <OptionFilterPerson value={defaultValue} isDisabled>
        {defaultValue}
      </OptionFilterPerson>
      {options.map(option => {
        return (
          <OptionFilterPerson key={option} value={option}>
            {option}
          </OptionFilterPerson>
        );
      })}
    </select>
  );
}

export default GlobalSelectFilter;
