export function Textarea({ id, label, placeholder, defaultValue, onChange }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id}>{label}</label>
      <textarea
        id={id}
        className="bg-violet"
        placeholder={placeholder}
        onChange={onChange}
      >
        {defaultValue}
      </textarea>
    </div>
  );
}
