import passkey from "../assets/icon/passkey.svg";
import Button from "../component/Button";
import info from "../assets/icon/Frame (12) (1).svg";
import { toast, ToastContainer } from "react-toastify";
import { userDataContext } from "../context/UserDataContext";
import { useContext } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";

export default function PasswordSettings() {
  const { referralData } = useContext(userDataContext);
  const updatePassword = (e) => {
    e.preventDefault();
    sendPasswordResetEmail(auth, referralData.email)
      .then((s) => toast.info("Reset Link has been sent to your Email Address"))
      .catch((e) => toast.error(`Error sending reset link: ${e}`));
  };
  
  return (
    <section className="rounded-tr-xl w-full bg-white shadow p-2 space-y-4 space-x-2">
      <ToastContainer />
      <h1 className="font-bold">Passsword Settings</h1>
      <img src={passkey} className="w-6 inline-block" />
      <span>Change Password</span>
      <Button
        onClick={(e) => updatePassword(e)}
        className="bg-blue-600 text-white p-2 rounded-lg font-bold"
      >
        Request Password Change
      </Button>
      <div className="bg-blue-300 text-blue-800 flex p-2 space-x-2 rounded-lg">
        <img src={info} className="w-7" />
        <p>
          A link will be sent to your email address, click on it to Reset your
          password
        </p>
      </div>
    </section>
  );
}
