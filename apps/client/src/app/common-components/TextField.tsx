import { Field } from 'formik';

function TextField({
  title,
  name,
  placeholder,
  type = 'text',
  className = '',
  classNameTitle = '',
  disabled = false
}: TextFieldProps) {
  return (
    <div className='flex flex-col gap-5'>
      <label htmlFor={name} className={classNameTitle}>
        {title}
      </label>
      <Field
        id={name}
        name={name}
        className={`py-2 px-4 outline-none ${className} ${
          disabled ? 'text-black/80' : 'text-black'
        }`}
        placeholder={placeholder}
        type={type}
        required
        disabled={disabled}
      />
    </div>
  );
}
export default TextField;
