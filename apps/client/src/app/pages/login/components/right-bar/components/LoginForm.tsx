import LibraryAPIService from '@api/LibraryAPI';
import { Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import LoginFormTextField from './components/LoginFormTextField';
import LoginSubmitButton from './components/LoginSubmitButton';
import useHandle from './hooks/useHandleLogin';

function LoginForm({ setError }: LoginFormProps) {
  const { useLogin } = useHandle({ setError });
  const [isAlreadyRegister, setIsAlreadyRegister] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<Office>({} as Office);
  const { getOffices } = LibraryAPIService();

  useEffect(() => {
    getOffices()
      .then(data => {
        if (data?.length > 0) {
          setResponse(data[0]);
          setIsAlreadyRegister(true);
        }
      })
      .catch((error: Error) => {
        throw new Error(error.message);
      })
      .finally(() => {
        setIsLoading(true);
      });
  }, []);

  return (
    <div>
      {isLoading && (
        <Formik
          initialValues={{
            email: '',
            password: '',
            office: `${response?.name ? response?.name : ''}`,
            isRegister: isAlreadyRegister
          }}
          onSubmit={useLogin}
          enableReinitialize
        >
          <Form className='flex flex-col gap-5'>
            <LoginFormTextField
              title='Office'
              name='office'
              placeholder='Enter your Office'
              type='text'
              disabled={isAlreadyRegister}
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
      )}
    </div>
  );
}

export default LoginForm;
