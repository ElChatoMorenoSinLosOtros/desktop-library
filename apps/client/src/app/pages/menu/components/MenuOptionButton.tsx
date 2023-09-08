import finesImage from '@assets/images/fines-management.png';
import loanImage from '@assets/images/loan-management.png';
import materialImage from '@assets/images/material-management.png';
import NotificationsImage from '@assets/images/notifications.png';
import personImage from '@assets/images/person-management.png';
import reservationImage from '@assets/images/reservations-management.png';
import Button from '@common-components/Button';

function MenuOptionButton({ src, title, navigate }: MenuOptionButtonProps) {
  function switchImage() {
    switch (title) {
      case 'Persons Management':
        return personImage;
      case 'Materials Management':
        return materialImage;
      case 'Loans Management':
        return loanImage;
      case 'Fines Management':
        return finesImage;
      case 'Reservations Management':
        return reservationImage;
      case 'Notifications':
        return NotificationsImage;
      default:
        return '';
    }
  }

  return (
    <Button
      className=' bg-[#182f48] px-7 py-4 text-[#E0E1DD] font-roboto-mono
      flex flex-col gap-2 justify-center items-center font-bold object-fill xl:min-w-[200px] lg:min-w-[175px] md:max-w-[125px] max-w-[100px]'
      onClick={() => navigate(src)}
    >
      <div className='flex justify-center place-items-center'>
        <img src={switchImage()} alt={title} className='object-cover' />
      </div>
      <h5 className='text-[10px] xl:text-lg md:text-base'>
        {title.split(' ')[0]}
      </h5>
    </Button>
  );
}

export default MenuOptionButton;
