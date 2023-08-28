import LibraryAPIService from '@api/LibraryAPI';
import Button from '@common-components/Button';
import GlobalList from '@common-components/GlobalList';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import { useEffect, useState } from 'react';

function PersonManagementPage() {
  const [selected, setSelected] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [users, setUsers] = useState<User[]>([]);

  const { getUsers } = LibraryAPIService();

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelected(event.target.value);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  useEffect(() => {
    getUsers()
      .then(resp => setUsers(resp))
      .catch((error: Error) => {
        throw new Error(error.message);
      });
  }, []);

  return (
    <GlobalList title='Person Management'>
      <div className='w-full p-6 flex flex-col gap-3'>
        <div className='px-6 py-2 grid place-items-center grid-cols-6 gap-4'>
          <div className='font-russo text-3xl text-[#0D1B2A]/75 text-start w-full'>
            List Person
          </div>
          <Button className='text-[#3E93FF] text-lg font-roboto-mono font-bold'>
            Add Person
          </Button>
          <Button className='text-[#3E93FF] text-lg font-roboto-mono font-bold'>
            See All
          </Button>
          <select
            value={selected}
            onChange={handleSelectChange}
            className='border-transparent outline-none bg-[#C8C8C8] py-2 px-4
            text-sm font-bold font-roboto-mono text-black/50'
          >
            <option
              disabled
              value=''
              className='text-sm font-bold font-roboto-mono hidden'
            >
              Filter
            </option>
            <option value='id' className='text-sm font-bold font-roboto-mono'>
              ID
            </option>
            <option value='name' className='text-sm font-bold font-roboto-mono'>
              Name
            </option>
            <option
              value='lastName'
              className='text-sm font-bold font-roboto-mono'
            >
              Last Name
            </option>
            <option value='type' className='text-sm font-bold font-roboto-mono'>
              Type
            </option>
            <option
              value='email'
              className='text-sm font-bold font-roboto-mono'
            >
              Email
            </option>
          </select>
          <input
            className='col-span-2 bg-[#C8C8C8] w-full text-black/75 font-roboto-mono text-sm font-bold
            py-2 px-4 outline-none placeholder:text-black/50'
            placeholder='Search'
            value={inputValue}
            onChange={handleInputChange}
          />
        </div>
        <hr className='border-[#415A77] border-[1.5px]' />
        <div
          className='p-6 grid place-items-center grid-cols-8 text-lg font-bold font-roboto-mono
          text-[#1B263B]/60 w-full gap-4'
        >
          <div className='w-full'>ID</div>
          <div className='w-full'>Name</div>
          <div className='w-full'>Last Name</div>
          <div className='w-full'>Type</div>
          <div className='w-full col-span-2'>Email</div>
          <div className='w-full text-center'>Edit</div>
          <div className='w-full text-center'>Remove</div>
        </div>
        <hr className='border-[#415A77] border-[1.5px]' />
        <div className='max-h-[550px] overflow-auto mr-[-15px] mt-4'>
          <div
            className='max-h-[550px] flex flex-col
        font-roboto-mono text-sm font-bold w-full gap-y-10'
          >
            {users.map((user: User) => {
              return (
                <div className='grid grid-cols-8 w-full px-6 gap-4'>
                  <div>{user.clientId}</div>
                  <div>{user.name}</div>
                  <div>{user.lastName}</div>
                  <div>{user.typeUser}</div>
                  <div className='col-span-2 underline'>{user.email}</div>
                  <Button className='text-center'>
                    <EditIcon />
                  </Button>
                  <Button className='text-center'>
                    <DeleteForeverIcon />
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </GlobalList>
  );
}

export default PersonManagementPage;
