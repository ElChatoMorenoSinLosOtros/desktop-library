import LibraryAPIService from '@api/LibraryAPI';
import DeleteButton from '@common-components/DeleteButton';
import { useNavigate } from 'react-router-dom';

export default function DeletePersonsButton({ id }: { id: number }) {
  const navigate = useNavigate();
  const { removeUserById } = LibraryAPIService();

  return (
    <DeleteButton
      className='text-center text-2xl'
      type='Person'
      onClick={() => {
        removeUserById({ id: String(id) })
          .then()
          .catch((e: Error) => {
            throw new Error(e.message);
          })
          .finally(() => navigate('/person-management'));
      }}
    />
  );
}
