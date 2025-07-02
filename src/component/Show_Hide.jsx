import hide from "../assets/icon/Hide.svg";
import show from "../assets/icon/Show.svg";
export default function HideShowComponent({
  className,
  onClick,
  showPassword,
}) {
  return (
    <img
      src={showPassword ? hide : show}
      className={className}
      onClick={onClick}
    />
  );
}
