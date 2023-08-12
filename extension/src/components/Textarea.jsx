export function Textarea({ id, label, placeholder, defaultValue, onChange }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
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
