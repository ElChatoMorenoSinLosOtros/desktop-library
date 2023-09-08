function ActionCard({
  action,
  disabled = false,
  handleChange,
  index
}: ActionCardProps) {
  return (
    <li
      key={action.id}
      className='w-full rounded-lg border-r border-gray-600 flex justify-center'
    >
      <div className='flex place-items-center pl-3'>
        <input
          id={action.action.title}
          type='checkbox'
          checked={action.checked}
          onChange={() => handleChange({ index })}
          className='w-5 h-5 rounded-md focus:ring-[##0d1b2a] ring-offset-gray-700 focus:ring-offset-gray-700 focus:ring-2 bg-gray-600 border-gray-500 accent-[#d9d9d9]'
          disabled={disabled}
        />
        <label
          htmlFor={action.action.title}
          className='w-full py-3 ml-2 text-base font-bold text-gray-300'
        >
          {action.action.title}
        </label>
      </div>
    </li>
  );
}

export default ActionCard;
