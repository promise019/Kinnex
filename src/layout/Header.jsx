import notification from "../assets/icon/notification.svg";

export default function Header({ children, Page }) {
  return (
    <header className='fixed top-0 left-0 bg-white p-3 flex w-screen md:ml-[30%] md:w-[70%] lg:ml-[25%] lg:w-[75%]'>
      <h1 className='font-bold text-xl'>{Page}</h1>

      <img src={notification} className='w-6 ' />
    </header>
  );
}
