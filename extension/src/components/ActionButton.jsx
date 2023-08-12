export function ActionButton({ icon, action }) {
  return (
    <div
      className="bg-violet clickable center border border-hoverable"
      style={{
        borderRadius: '6px',
        minWidth: '32px',
        height: '32px',
      }}
      onClick={action}
    >
      {icon}
    </div>
  );
}
