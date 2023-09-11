import { useSearch } from '../useSearch';

interface Props {
  materials: Material[];
  setMaterials: React.Dispatch<React.SetStateAction<Material[]>>;
}

export function useSearchMaterials({ materials, setMaterials }: Props) {
  const filterData = (value: string, filter: string) => {
    if (filter === '' || value === '') {
      setMaterials(materials);
      return;
    }
    const filterMaterials = materials.filter(material => {
      if (filter === 'ID') {
        return material.materialId === Number(value);
      }
      if (filter === 'Title') {
        return material.title.toLowerCase().includes(value.toLowerCase());
      }
      if (filter === 'Category') {
        return material.category.toLowerCase().includes(value.toLowerCase());
      }
      if (filter === 'Available') {
        return String(material.available)
          .toLocaleLowerCase()
          .includes(value.toLowerCase());
      }
      if (filter === 'Type Material') {
        return material.type_material
          .toLowerCase()
          .includes(value.toLowerCase());
      }
      if (filter === 'Quantity') {
        return material.quantity === Number(value);
      }
      return material;
    });
    setMaterials(filterMaterials);
  };

  const {
    handleInputChange,
    handleSelectChange,
    inputValue,
    filter,
    setInputValue,
    setFilter
  } = useSearch({
    filterData
  });

  return {
    handleInputChange,
    handleSelectChange,
    inputValue,
    filter,
    setInputValue,
    setFilter
  };
}
