import GlobalBlueButton from '@common-components/GlobalBlueButton';
import GlobalSearchInput from '@common-components/GlobalSearchInput';
import GlobalSelectFilter from '@common-components/GlobalSelectFilter';
import { useSearchMaterials } from '@hooks/materials/useSearchMaterials';
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
  setMaterials: React.Dispatch<React.SetStateAction<Material[]>>;
  materials: Material[];
}

function MaterialHeader({ materials, setMaterials }: Props) {
  const navigate = useNavigate();
  const { handleInputChange, handleSelectChange, inputValue, setInputValue } =
    useSearchMaterials({
      materials,
      setMaterials
    });

  return (
    <div className='px-6 py-2 grid place-items-center grid-cols-5'>
      <div className='font-russo text-3xl text-[#0D1B2A]/75 text-start w-full'>
        List Material
      </div>
      <GlobalBlueButton
        onClick={() => {
          navigate('/material-management/add');
        }}
      >
        Add Material
      </GlobalBlueButton>
      <GlobalSelectFilter
        handleSelectChange={handleSelectChange}
        defaultValue='Filter'
        options={[
          'ID',
          'Title',
          'Category',
          'Available',
          'Type Material',
          'Quantity'
        ]}
      />
      <GlobalSearchInput
        inputValue={inputValue}
        handleInputChange={handleInputChange}
      />
    </div>
  );
}

export default MaterialHeader;
