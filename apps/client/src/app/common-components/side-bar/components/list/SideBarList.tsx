import menus from '@menus/side-bar-menu.json';
import { useNavigate } from 'react-router-dom';
import SideBarItemList from './components/item-list/SideBarItemList';

function SideBarList() {
  const navigate = useNavigate();

  return (
    <ul className='flex flex-col mt-7 font-roboto-mono text-xl font-bold text-[#E0E1DD]'>
      {(menus as SideBarMenu).menus.map(menu => {
        return (
          <SideBarItemList
            key={menu.id}
            name={menu.name}
            link={menu.link}
            navigate={navigate}
          />
        );
      })}
    </ul>
  );
}

export default SideBarList;
