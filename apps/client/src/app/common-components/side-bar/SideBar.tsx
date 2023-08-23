import SideBarFooter from './components/footer/SideBarFooter';
import SideBarHeader from './components/header/SideBarHeader';
import SideBarList from './components/list/SideBarList';
import SideBarUser from './components/user/SideBarUser';

function SideBar() {
  return (
    <div className='h-full col-span-3 bg-[#0d1b2a] relative'>
      <SideBarHeader />
      <SideBarUser />
      <SideBarList />
      <SideBarFooter />
    </div>
  );
}
export default SideBar;
