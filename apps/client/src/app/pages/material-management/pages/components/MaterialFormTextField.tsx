import TextField from '@common-components/TextField';

function MaterialFormTextField({
  title,
  name,
  placeholder,
  type
}: MaterialFormTextFieldProps) {
  return (
    <TextField
      title={title}
      name={name}
      placeholder={placeholder}
      type={type}
      className='w-[650px] h-15 rounded-lg placeholder:text-black/50 bg-white '
    />
  );
}

export default MaterialFormTextField;
