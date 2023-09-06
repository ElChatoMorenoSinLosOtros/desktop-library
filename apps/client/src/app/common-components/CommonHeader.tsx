import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import Button from './Button';

function CommonHeader({ title, subTitle = '' }: CommonHeaderProps) {
  const navigate = useNavigate();

  return (
    <header className='pt-14 mx-14 mb-8 text-[#0D1B2A]'>
      <div className='flex flex-col gap-8'>
        <div className='px-8 text-5xl font-russo w-full justify-between flex'>
          <div>{title}</div>
          <div>
            <Button
              onClick={() => navigate(-1)}
              className='text-white bg-[#0d1b2a] px-9 rounded-xl grid place-content-center py-3 '
            >
              <ArrowBackIcon />
            </Button>
          </div>
        </div>
        {subTitle !== '' && <hr className='border-black' />}
      </div>
      <div
        className={`${subTitle === '' ? 'hidden' : 'mt-8 font-russo text-3xl'}`}
      >
        {subTitle}
      </div>
    </header>
  );
}

export default CommonHeader;
