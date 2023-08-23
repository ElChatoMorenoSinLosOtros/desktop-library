/* eslint-disable react/button-has-type */
import { useState } from 'react';

function CancelButton() {
  const [, setPopupVisible] = useState(false);

  const handleClick = () => {
    setPopupVisible(false);
  };

  return (
    <button
      onClick={handleClick}
      className='rounded-full bg-white text-black py-2 px-4 hover:bg-gray-300 w-40 h-16'
    >
      Close
    </button>
  );
}

export default CancelButton;
