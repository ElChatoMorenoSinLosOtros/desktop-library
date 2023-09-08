import ActionCard from './ActionCard';

function AdminPermissions({
  actions,
  setActions,
  disabled = false
}: AdminPermissionsProps) {
  const handleChange = ({ index }: { index: number }) => {
    const newActions = structuredClone(actions);
    newActions[index].checked = !newActions[index].checked;
    setActions(newActions);
  };

  return (
    <>
      <div className='place-items-center w-full font-bold rounded-lg flex bg-gray-700 border-gray-600 text-white'>
        {actions.slice(0, 3).map((action: ActionChecked, index) => {
          return (
            <ActionCard
              key={action.id}
              action={action}
              index={index}
              handleChange={handleChange}
              disabled={disabled}
            />
          );
        })}
      </div>
      <div className='place-items-center w-full font-bold rounded-lg flex bg-gray-700 border-gray-600 text-white'>
        {actions
          .slice(3, actions.length)
          .map((action: ActionChecked, index) => {
            return (
              <ActionCard
                key={action.id}
                action={action}
                index={index + 3}
                handleChange={handleChange}
                disabled={disabled}
              />
            );
          })}
      </div>
    </>
  );
}

export default AdminPermissions;
