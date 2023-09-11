interface Props {
  error: string;
}

function ErrorPopup({ error }: Props) {
  return (
    <div
      className=' text-white text-center font-bold rounded-lg absolute
            left-0 right-0 top-0 mt-40 flex justify-center font-roboto'
    >
      <div className='bg-red-500 px-5 py-3 rounded-xl'>{error}</div>
    </div>
  );
}

export default ErrorPopup;
