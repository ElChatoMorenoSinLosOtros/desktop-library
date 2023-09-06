import finesImage from '@assets/images/fines-management.png';
import loanImage from '@assets/images/loan-management.png';
import materialImage from '@assets/images/material-management.png';
import personImage from '@assets/images/person-management.png';
import ReportsImage from '@assets/images/reports.png';
import reservationImage from '@assets/images/reservations-management.png';
import Button from '@common-components/Button';

function MenuOptionButton({ src, title, navigate }: MenuOptionButtonProps) {
  function switchImage() {
    switch (title) {
      case 'Persons':
        return personImage;
      case 'Materials':
        return materialImage;
      case 'Loans':
        return loanImage;
      case 'Fines':
        return finesImage;
      case 'Reservations':
        return reservationImage;
      case 'Reports':
        return ReportsImage;
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
      <h5 className='text-[10px] xl:text-lg md:text-base'>{title}</h5>
    </Button>
  );
}

export default MenuOptionButton;
