import { Field } from 'formik';

function TextField({
  title,
  name,
  placeholder,
  type = 'text',
  className = ''
}: TextFieldProps) {
  return (
    <div className='flex flex-col gap-1'>
      <label htmlFor={name}>{title}</label>
      <Field
        id={name}
        name={name}
        className={`py-3 px-5 outline-none ${className}`}
        placeholder={placeholder}
        type={type}
      />
    </div>
  );
}
export default TextField;
