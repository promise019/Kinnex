export default function Input({
  type,
  value,
  onChange,
  className,
  placeholder,
  name,
  ref,
  readOnly,
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
      readOnly={readOnly}
    />
  );
}
