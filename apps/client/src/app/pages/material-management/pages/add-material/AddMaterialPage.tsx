import MaterialSubmitButton from '../components/MaterialSubmitButton';
import MaterialAddForm from './components/MaterialAddForm';

function AddMaterialPage() {
  return (
    <div className='bg-[#E0E1DD] text-[#0D1B2A] min-h-screen p-5 font-roboto-mono font-bold flex flex-col items-left justify-left'>
      <h4
        className='text-6xl font-roboto-mono relative'
        style={{ left: '60px' }}
      >
        Material Management
      </h4>
      <hr
        className='absolute top-24 left-3/4 transform -translate-x-2/4 w-3/5 border-t-4 border-gray-700 mt-6'
        style={{ left: '1250px' }}
      />
      <h2
        className='absolute top-44 text-4xl text-[#0D1B2A] p-5 font-roboto-mono font-bold flex flex-col items-left justify-left'
        style={{ left: '600px' }}
      >
        Add Material
      </h2>
      <div className='mt-44'>
        <MaterialAddForm />
      </div>
      <div className='flex justify-end pr-8 mt-12'>
        <MaterialSubmitButton>Add</MaterialSubmitButton>
      </div>
    </div>
  );
}

export default AddMaterialPage;
