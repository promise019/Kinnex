import { useContext } from "react";
import account from "../assets/icon/Account.svg";
import Input from "../component/Input";
import { userDataContext } from "../context/UserDataContext";
import Button from "../component/Button";

export default function AccountSetting() {
  const { referralData } = useContext(userDataContext);

  const updateData = async (e) => {
    e.preventDefault();
  };
  return (
    <section className="rounded-tr-xl w-full bg-white shadow p-2 space-y-2">
      <div className="flex space-x-2.5">
        <img
          src={account}
          className="inline-block w-13 p-2 rounded-full bg-gray-400"
        />
        <span className="font-bold mt-3">
          {referralData.Firstname}
          {' '}
          {referralData.Lastname}
        </span>
      </div>
      <form className="space-y-4">
        <Input
          value={referralData.Firstname}
          readOnly={true}
          className="p-2 shadow w-full lg:w-[49%]"
        />
        <Input
          value={referralData.Lastname}
          readOnly={true}
          className="p-2 shadow w-full lg:w-[49%]"
        />
        <Input
          value={referralData.email}
          readOnly={true}
          className="p-2 shadow w-full lg:w-[98%]"
        />
        {/* <Button
          onClick={(e) => updateData(e)}
          className="bg-blue-600 text-white p-2 rounded-lg font-bold"
        >
          Update
        </Button> */}
      </form>
    </section>
  );
}
