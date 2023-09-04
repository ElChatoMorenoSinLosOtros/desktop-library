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
      className='w-[230px] h-[180px] bg-[#182f48] p-5 text-[#E0E1DD] font-roboto-mono text-xl
      flex flex-col gap-2 justify-center items-center font-bold'
      onClick={() => navigate(src)}
    >
      <div className='grid place-content-center'>
        <img src={switchImage()} alt={title} className='h-[120px]' />
      </div>
      <h5>{title}</h5>
    </Button>
  );
}

export default MenuOptionButton;
