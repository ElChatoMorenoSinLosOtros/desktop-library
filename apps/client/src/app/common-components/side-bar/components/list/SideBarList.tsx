import useAdminStore from '@store/AdminStore';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SideBarItemList from './components/item-list/SideBarItemList';

function SideBarList() {
  const navigate = useNavigate();
  const { admin } = useAdminStore.getState();
  const { actions } = admin;
  const [menu, setMenu] = useState<Action[]>([]);

  useEffect(() => {
    setMenu(actions?.menu);
  }, [actions?.menu]);

  return (
    <ul className='flex flex-col mt-7 font-roboto-mono text-xl font-bold text-[#E0E1DD] max-h-full overflow-auto'>
      <SideBarItemList name='Menu' link='/menu' navigate={navigate} />
      {menu?.map(item => {
        return (
          <SideBarItemList
            key={item.id}
            name={item.title}
            link={item.url}
            navigate={navigate}
          />
        );
      })}
    </ul>
  );
}

export default SideBarList;
