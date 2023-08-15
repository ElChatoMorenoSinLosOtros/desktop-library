import TextField from './components/TextField';

function Login() {
  return (
    <div className='bg-slate-900 h-screen grid place-content-center'>
      <div className='flex flex-col gap-10'>
        <div className='flex flex-col gap-5'>
          <div className='text-3xl font-light text-white'>Welcome Back</div>
          <div className='text-sm font-light text-white'>
            Enter Your Credentials
          </div>
        </div>

        <div className='flex flex-col gap-3'>
          <TextField title='Email' placeholder='Enter Your Email' />

          <TextField title='Password' placeholder='******' />
        </div>

        <button
          type='button'
          onClick={() => {}}
          className='rounded-xl bg-slate-400 text-white
        font-bold py-2 px-1'
        >
          Sign In
        </button>
      </div>
    </div>
  );
}
export default Login;
