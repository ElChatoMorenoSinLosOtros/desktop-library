import OptionsMenuPage from './components/OptionsMenuPage';

function MenuPage() {
  return (
    <div className='h-screen flex flex-col p-20'>
      <header className='font-russo text-6xl text-start w-full flex'>
        Menu
      </header>
      <OptionsMenuPage />
    </div>
  );
}

export default MenuPage;
