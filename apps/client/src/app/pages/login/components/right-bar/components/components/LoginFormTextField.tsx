import TextField from '@common-components/TextField';

function LoginFormTextField({
  title,
  name,
  placeholder,
  type,
  disabled = false
}: LoginFormTextFieldProps) {
  return (
    <TextField
      title={title}
      name={name}
      placeholder={placeholder}
      type={type}
      className='w-full border-gray-700 border-[1px] rounded-lg
      placeholder:text-black/50 bg-transparent'
      disabled={disabled}
    />
  );
}

export default LoginFormTextField;
