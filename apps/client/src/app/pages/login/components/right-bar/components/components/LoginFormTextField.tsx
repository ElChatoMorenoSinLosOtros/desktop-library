import TextField from '@common-components/TextField';

function LoginFormTextField({
  title,
  name,
  placeholder,
  type
}: LoginFormTextFieldProps) {
  return (
    <TextField
      title={title}
      name={name}
      placeholder={placeholder}
      type={type}
      className='w-full border-gray-700 border-[1px] rounded-lg placeholder:text-black/50 bg-transparent '
    />
  );
}

export default LoginFormTextField;
