import OptionFilterPerson from './components/OptionFilterPerson';

function SelectFilterPerson({ handleSelectChange }: SelectFilterPersonProps) {
  return (
    <select
      onChange={handleSelectChange}
      className='border-transparent outline-none bg-[#C8C8C8] py-2 px-4
    text-sm font-bold font-roboto-mono text-black/50'
      required
      defaultValue='filter'
    >
      <OptionFilterPerson value='filter' isDisabled>
        Filter
      </OptionFilterPerson>
      <OptionFilterPerson value='id'>ID</OptionFilterPerson>
      <OptionFilterPerson value='name'>Name</OptionFilterPerson>
      <OptionFilterPerson value='type'>Type</OptionFilterPerson>
      <OptionFilterPerson value='email'>Email</OptionFilterPerson>
    </select>
  );
}

export default SelectFilterPerson;
