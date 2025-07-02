export default function Input({
  type,
  value,
  onChange,
  className,
  placeholder,
  name,
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      className={className}
      placeholder={placeholder}
      name={name}
    />
  );
}
