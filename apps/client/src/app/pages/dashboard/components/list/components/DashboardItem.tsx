function DashboardItem({ notify }: { notify: Notify }) {
  return (
    <div className='grid grid-cols-6 w-full px-6 gap-4'>
      <div>{notify.notifyId}</div>
      <div>{notify.name}</div>
      <div>{notify.type}</div>
      <div>{String(notify.date)}</div>
      <div>{notify.information}</div>
    </div>
  );
}

export default DashboardItem;
