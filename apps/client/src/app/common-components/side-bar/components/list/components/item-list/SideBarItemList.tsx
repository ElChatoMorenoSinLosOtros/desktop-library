import ItemListButton from './components/ItemListButton';

function SideBarItemList({ name, link, navigate }: SideBarItemListProps) {
  return (
    <li>
      <ItemListButton
        onClick={() => {
          navigate(link);
        }}
      >
        {name}
      </ItemListButton>
    </li>
  );
}

export default SideBarItemList;
