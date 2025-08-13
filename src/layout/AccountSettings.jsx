import { useContext } from "react";
import account from "../assets/icon/Account.svg";
import Input from "../component/Input";
import { userDataContext } from "../context/UserDataContext";

export default function AccountSetting() {
  const { email, Firstname, Lastname } = useContext(userDataContext);
  return (
    <section className="rounded-tr-xl w-full bg-white shadow p-2 space-y-2">
      <div className="flex space-x-2.5">
        <img
          src={account}
          className="inline-block w-13 p-2 rounded-full bg-gray-400"
        />
        <span className="font-bold mt-3">Effefiong Archibong</span>
      </div>
      <form className="space-y-2">
        <Input value={Firstname} className='p-2 shadow' />
        <Input value={Firstname} className='p-2 shadow' />
        <Input value={Firstname} className='p-2 shadow' />
      </form>
    </section>
  );
}
