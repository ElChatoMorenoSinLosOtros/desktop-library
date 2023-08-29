import Button from '@common-components/Button';
import React from 'react';

function BluePersonButton({
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

export default BluePersonButton;
