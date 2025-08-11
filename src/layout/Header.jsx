import { useNavigate } from "react-router";
import notification from "../assets/icon/notification.svg";

export default function Header({ children, Page }) {
  const navigate = useNavigate();
  return (
    <header className="fixed top-0 left-0 bg-white p-3 flex w-screen md:ml-[30%] md:w-[70%] lg:ml-[25%] lg:w-[75%]">
      <h1 className="font-bold text-xl">{Page}</h1>

      <div className="fixed rounded-full w-2 h-2 bg-red-700 right-20 top-3.5 md:right-3.5"></div>

      <img
        src={notification}
        onClick={() => navigate("/home/notification")}
        className="w-6 fixed top-4 right-20 md:right-3"
      />
    </header>
  );
}
