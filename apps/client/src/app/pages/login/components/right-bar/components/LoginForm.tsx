import { Form, Formik } from 'formik';
import LoginFormTextField from './components/LoginFormTextField';
import LoginSubmitButton from './components/LoginSubmitButton';
import useHandle from './hooks/useHandleLogin';

function LoginForm({ setError }: LoginFormProps) {
  const { useLogin } = useHandle({ setError });

  return (
    <Formik
      initialValues={{ email: '', password: '', sucursal: '' }}
      onSubmit={useLogin}
    >
      <Form className='flex flex-col gap-5'>
        <LoginFormTextField
          title='Sucursal'
          name='sucursal'
          placeholder='Enter your Sucursal'
          type='text'
          disabled
        />
        <LoginFormTextField
          title='Email'
          name='email'
          placeholder='Enter your Email'
          type='email'
        />
        <LoginFormTextField
          title='Password'
          name='password'
          placeholder='••••••••'
          type='password'
        />
        <LoginSubmitButton>Sign in</LoginSubmitButton>
      </Form>
    </Formik>
  );
}

export default LoginForm;
