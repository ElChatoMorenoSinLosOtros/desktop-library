import SideBarFooter from './components/footer/SideBarFooter';
import SideBarHeader from './components/header/SideBarHeader';
import SideBarList from './components/list/SideBarList';
import SideBarUser from './components/user/SideBarUser';

function SideBar() {
  return (
    <div className='h-screen w-full bg-[#0d1b2a] relative max-h-screen flex flex-col overflow-auto justify-between'>
      <SideBarHeader />
      <SideBarUser />
      <SideBarList />
      <SideBarFooter />
    </div>
  );
}
export default SideBar;
