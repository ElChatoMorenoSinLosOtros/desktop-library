import { Field } from 'formik';

function TextField({
  title,
  name,
  placeholder,
  type = 'text',
  className = '',
  classNameTitle = ''
}: TextFieldProps) {
  return (
    <div className='flex flex-col gap-5'>
      <label htmlFor={name} className={classNameTitle}>
        {title}
      </label>
      <Field
        id={name}
        name={name}
        className={`py-2 px-4 outline-none ${className}`}
        placeholder={placeholder}
        type={type}
        required
      />
    </div>
  );
}
export default TextField;
