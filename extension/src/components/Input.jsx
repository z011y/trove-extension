export function Input({
  id,
  label,
  type,
  placeholder,
  defaultValue,
  onChange,
}) {
  return (
    <div className="flex flex-col gap-2">
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
