import MaterialItem from './components/MaterialItem';

function MaterialList({ materials }: { materials: Material[] }) {
  return (
    <div
      className={`h-full overflow-auto mt-2 ${
        materials.length > 9 ? 'mr-[-17px]' : ''
      }`}
    >
      <div
        className='h-full flex flex-col
      font-roboto-mono text-sm font-bold w-full gap-y-10'
      >
        {materials.map((material: Material) => {
          return <MaterialItem key={material.materialId} material={material} />;
        })}
      </div>
    </div>
  );
}

export default MaterialList;
