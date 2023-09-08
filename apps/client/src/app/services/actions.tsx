import ActionsChecked from '../pages/admin/pages/components/ActionsChecked';

const actionsToActionsChecked = ({ actions }: { actions: Action[] }) => {
  const newActions: ActionChecked[] = ActionsChecked.map(action => {
    if (actions.some(a => a.id === action.id)) {
      return {
        id: action.id,
        checked: true,
        action: action.action
      };
    }
    return {
      id: action.id,
      checked: false,
      action: action.action
    };
  });

  return newActions;
};

export { actionsToActionsChecked };
