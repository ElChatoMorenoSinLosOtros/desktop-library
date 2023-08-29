import React from 'react';
import Button from './Button';

function GlobalBlueButton({
  children,
  onClick
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <Button
      onClick={onClick}
      className='text-[#3E93FF] text-lg font-roboto-mono font-bold'
    >
      {children}
    </Button>
  );
}

export default GlobalBlueButton;
