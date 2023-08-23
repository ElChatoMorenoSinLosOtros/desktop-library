/* eslint-disable react/button-has-type */
import { useState } from 'react';
import OkButton from './components/OkButton';

function Delet() {
  const [isPopupVisible, setPopupVisible] = useState(false);

  const openPopup = () => {
    setPopupVisible(true);
  };

  const closePopup = () => {
    setPopupVisible(false);
  };

  return (
    <div className='h-screen flex items-center justify-center bg-[#0d1b2a] text-white'>
      <button
        onClick={openPopup}
        className='text-white bg-blue-500 py-2 px-4 rounded'
      >
        Open Popup
      </button>

      {isPopupVisible && (
        <div className='fixed inset-0 flex items-center justify-center bg-[#0d1b2a] bg-opacity-90 z-50'>
          <div className='bg-[#0d1b2a] text-white w-3/6 h-auto p-4 rounded-lg border border-white flex flex-col items-center'>
            <div className='text-center mt-5 mb-10'>
              <p className='text-18' style={{ width: '357px' }}>
                Are you shure to delete it?
              </p>
            </div>
            <div className='flex gap-4 mt-4'>
              <button
                onClick={closePopup}
                className='rounded-full bg-white text-black py-2 px-4 hover:bg-gray-300 w-40 h-16'
              >
                Cancel
              </button>
              <OkButton />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Delet;
