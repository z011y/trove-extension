export function Input({
  id,
  label,
  type,
  placeholder,
  defaultValue,
  onChange,
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        className="bg-violet"
        type={type}
        placeholder={placeholder}
        value={defaultValue}
        onChange={onChange}
      />
    </div>
  );
}
