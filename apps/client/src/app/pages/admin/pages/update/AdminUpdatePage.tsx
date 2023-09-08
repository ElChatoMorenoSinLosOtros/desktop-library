import LibraryAPIService from '@api/LibraryAPI';
import GlobalForm from '@common-components/GlobalFrom';
import GlobalSubmitButton from '@common-components/GlobalSubmitButton';
import GlobalTextField from '@common-components/GlobalTextField';
import { actionsToActionsChecked } from '@services/actions';
import { Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ActionsChecked from '../components/ActionsChecked';
import AdminPermissions from '../components/AdminPermissions';

function AdminUpdatePage() {
  const [actions, setActions] = useState<ActionChecked[]>(ActionsChecked);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { getAdminById, updateAdminById } = LibraryAPIService();
  const [admin, setAdmin] = useState<SubAdmin>({} as SubAdmin);
  const [error, setError] = useState<string>('');
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
        <GlobalForm title='Admin Management' subTitle='Add Admin'>
          <Formik
            enableReinitialize
            initialValues={{
              email: `${admin.email}`,
              name: `${admin.name}`,
              role: `${admin.role}`,
              password: ''
            }}
            onSubmit={values => {
              if (values.role === 'admin') {
                setError('You can not add admin');
                return;
              }
              const uploadActions: AdminActions = {
                menu: []
              };
              uploadActions.menu = actions
                .filter(item => item.checked)
                .map(item => item.action);

              updateAdminById({
                subAdmin: {
                  ...values,
                  actions: uploadActions
                },
                id: Number(id)
              })
                .then()
                .catch((err: Error) => {
                  throw new Error(err.message);
                })
                .finally(() => {
                  navigate('/admin');
                });
            }}
          >
            <Form className='flex flex-col h-full pb-12 gap-16 w-full'>
              {error && (
                <div
                  className=' text-white text-center font-bold rounded-lg absolute
              left-0 right-0 top-0 mt-40 flex justify-center font-roboto'
                >
                  <div className='bg-red-500 px-5 py-3 rounded-xl'>{error}</div>
                </div>
              )}
              <div className='w-full gap-12 flex px-24 justify-between'>
                <GlobalTextField
                  title='New Email:'
                  name='email'
                  type='email'
                  className='w-full'
                />
                <GlobalTextField
                  title='New Password:'
                  name='password'
                  type='password'
                  className='w-full'
                  notRequired
                />
              </div>
              <div className='w-full gap-12 flex px-24 justify-between'>
                <GlobalTextField
                  title='New Name:'
                  name='name'
                  className='w-full'
                />
                <GlobalTextField
                  title='New Role:'
                  name='role'
                  className='w-full'
                />
              </div>
              <div
                className='px-44 font-roboto-mono flex flex-col gap-10 justify-center
            place-items-center h-full mb-20'
              >
                <h2 className='col-span-3 text-center text-4xl font-russo'>
                  New Permissions
                </h2>

                <AdminPermissions actions={actions} setActions={setActions} />
              </div>

              <GlobalSubmitButton className='absolute right-0 bottom-0 mb-12 mr-12'>
                Update
              </GlobalSubmitButton>
            </Form>
          </Formik>
        </GlobalForm>
      )}
    </div>
  );
}

export default AdminUpdatePage;
