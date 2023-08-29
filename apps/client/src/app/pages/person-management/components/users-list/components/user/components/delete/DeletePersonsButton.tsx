import LibraryAPIService from '@api/LibraryAPI';
import DeleteButton from '@common-components/DeleteButton';

export default function DeletePersonsButton({ id }: { id: number }) {
  const { removeUserById } = LibraryAPIService();

  return (
    <DeleteButton
      className='text-center text-2xl'
      type='Person'
      onClick={() => {
        (async () => {
          await removeUserById({
            id: id.toString()
          });
        })().catch((error: Error) => {
          throw new Error(error.message);
        });
      }}
    />
  );
}
