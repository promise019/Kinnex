export default function Input({
  type,
  value,
  onChange,
  className,
  placeholder,
  name,
  ref,
}) {
  return (
    <input
      ref={ref}
      type={type}
      value={value}
      onChange={onChange}
      className={className}
      placeholder={placeholder}
      name={name}
    />
  );
}
