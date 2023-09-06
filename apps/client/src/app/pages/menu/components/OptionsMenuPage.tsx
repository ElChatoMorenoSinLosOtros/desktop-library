import optionsMenu from '@menus/options-menu.json';
import { useNavigate } from 'react-router-dom';
import MenuOptionButton from './MenuOptionButton';

function OptionsMenuPage() {
  const navigate = useNavigate();
  return (
    <div className='flex flex-col justify-center place-items-center xl:gap-20 gap-10 h-full'>
      <div className='flex xl:gap-28 gap-12'>
        {(optionsMenu as OptionsMenu).menu.slice(0, 3).map(option => {
          return (
            <MenuOptionButton
              key={option.id}
              src={option.url}
              title={option.title}
              navigate={navigate}
            />
          );
        })}
      </div>
      <div className='flex xl:gap-28 gap-12'>
        {(optionsMenu as OptionsMenu).menu
          .slice(3, (optionsMenu as OptionsMenu).menu.length)
          .map(option => {
            return (
              <MenuOptionButton
                key={option.id}
                src={option.url}
                title={option.title}
                navigate={navigate}
              />
            );
          })}
      </div>
    </div>
  );
}

export default OptionsMenuPage;
