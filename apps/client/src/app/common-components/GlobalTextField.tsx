import TextField from './TextField';

function GlobalTextField({ title, name, type = 'text' }: GlobalTextFieldProps) {
  return (
    <TextField
      title={title}
      name={name}
      placeholder=''
      type={type}
      className='text-lg font-roboto-mono font-bold'
      classNameTitle='font-bold font-roboto-mono text-xl'
    />
  );
}

export default GlobalTextField;
