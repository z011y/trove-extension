export function ButtonAction({ icon, action }) {
  return (
    <div
      className="bg-violet clickable center border border-hoverable rounded-md min-w-[32px] h-8"
      onClick={action}
    >
      {icon}
    </div>
  );
}
