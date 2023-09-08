import LibraryAPIService from '@api/LibraryAPI';
import GlobalInfoForm from '@common-components/GlobalInfoForm';
import GlobalText from '@common-components/GlobalText';
import { actionsToActionsChecked } from '@services/actions';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ActionsChecked from '../components/ActionsChecked';
import AdminPermissions from '../components/AdminPermissions';

function AdminInfoPage() {
  const [actions, setActions] = useState<ActionChecked[]>(ActionsChecked);
  const [isLoading, setIsLoading] = useState(true);

  const { getAdminById } = LibraryAPIService();
  const [admin, setAdmin] = useState<SubAdmin>({} as SubAdmin);
  const { id } = useParams<AdminInfoPageParams>();

  useEffect(() => {
    async function fetchAdmin() {
      const response = await getAdminById({ id: Number(id) });

      setActions(actionsToActionsChecked({ actions: response.actions.menu }));
      setAdmin(response);
      setIsLoading(false);
    }

    fetchAdmin();
  }, []);

  return (
    <div>
      {!isLoading && (
        <GlobalInfoForm title='Admin Management' subTitle='Info Admin'>
          <div className='w-full gap-12 flex px-24 justify-between'>
            <GlobalText title='Email:' text={admin?.email} className='w-full' />
            <GlobalText
              title='Created At:'
              text={admin?.createdAt.toString().substring(0, 10)}
              className='w-full'
            />
          </div>
          <div className='w-full gap-12 flex px-24 justify-between mt-12'>
            <GlobalText title='Name:' text={admin.name} className='w-full' />
            <GlobalText title='Role:' text={admin.role} className='w-full' />
          </div>
          <div
            className='px-44 font-roboto-mono flex flex-col gap-10 justify-center
          place-items-center h-full mb-20'
          >
            <h2 className='col-span-3 text-center text-4xl font-russo'>
              Permissions
            </h2>

            <AdminPermissions
              actions={actions}
              setActions={setActions}
              disabled
            />
          </div>
        </GlobalInfoForm>
      )}
    </div>
  );
}

export default AdminInfoPage;
