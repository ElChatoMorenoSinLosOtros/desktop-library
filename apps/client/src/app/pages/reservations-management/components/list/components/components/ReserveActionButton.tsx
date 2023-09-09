import Button from '@common-components/Button.tsx';
import React from 'react';

function ReservesActionButton({
  children,
  onClick
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <Button
      onClick={onClick}
      className='text-center text-2xl grid place-content-center'
    >
      {children}
    </Button>
  );
}

export default ReservesActionButton;
