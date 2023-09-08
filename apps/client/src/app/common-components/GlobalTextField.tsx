import TextField from './TextField';

function GlobalTextField({
  title,
  name,
  type = 'text',
  disabled = false,
  className = ''
}: GlobalTextFieldProps) {
  return (
    <TextField
      title={title}
      name={name}
      placeholder=''
      type={type}
      className='text-lg font-roboto-mono font-bold'
      classNameTitle='font-bold font-roboto-mono text-xl'
      disabled={disabled}
      classNameDiv={className}
    />
  );
}

export default GlobalTextField;
