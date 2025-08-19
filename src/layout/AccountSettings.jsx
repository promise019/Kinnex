import { useContext } from "react";
import account from "../assets/icon/Account.svg";
import Input from "../component/Input";
import { userDataContext } from "../context/UserDataContext";
import Button from "../component/Button";
import { useNavigate } from "react-router";

export default function AccountSetting() {
  const { referralData } = useContext(userDataContext);

  const navigate = useNavigate();
  return (
    <section className="rounded-tr-xl w-full bg-white shadow p-2 space-y-2">
      <div className="flex space-x-2.5">
        <img
          src={account}
          className="inline-block w-13 p-2 rounded-full bg-gray-400"
        />
        <span className="font-bold mt-3">
          {referralData.Firstname} {referralData.Lastname}
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
        <Button
          onClick={(e) => (
            e.preventDefault(),
            localStorage.removeItem("kinnex-login"),
            sessionStorage.removeItem("kinnex-login"),
            navigate("/registration/login")
          )}
          className="bg-blue-600 text-white p-2 rounded-lg font-bold md:hidden"
        >
          Logout
        </Button>
      </form>
    </section>
  );
}
