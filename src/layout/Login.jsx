import { useState } from "react";
import Input from "../component/Input";
import { Link, useNavigate } from "react-router";
import Button from "../component/Button";
import HideShowComponent from "../component/Show_Hide";
import { LoadingIndicator1 } from "../component/Loading indicator";
import { toast, ToastContainer } from "react-toastify";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export default function Login() {
  const [showpassword, setShowpassword] = useState(false);
  const [isloading, setIsloading] = useState(false);
  const [agree, setAgree] = useState(false);

  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  //input onchange handler
  const handleChange = (e) => {
    const { value, name } = e.target;

    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  //login data submission login
  async function handleSubmit(e) {
    e.preventDefault();
    if (userData.email.trim() === "" || userData.password.trim() === "")
      return toast.error("Email and Password required");

    setIsloading(true);
    signInWithEmailAndPassword(auth, userData.email, userData.password)
      .then((usercredential) => {
        const user = usercredential.user;
        sessionStorage.setItem("kinnex-login", user.uid);

        if (agree) {
          //remember user
          localStorage.setItem("kinnex-login", user.uid);
        }
        console.log(user.uid);
        navigate("/home/dashboard");
        toast.success("login successfull");
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/user-not-found":
            toast.error("this user does not exist");
            break;
          case "auth/invalid-email":
            toast.error("invalid email");
            break;
          case "auth/wrong-password":
            toast.error("incorrect password");
            break;
          case "auth/network-request-failed":
            toast.error("network error");
            break;
        }
        setIsloading(false);
        console.log(error.code);
      })
      .finally(() => setIsloading(false));
  }

  return (
    <div className='space-y-6'>
      <ToastContainer />

      {isloading && (
        <LoadingIndicator1 className={"top-75 ml-[39%] md:ml-[17%]"} />
      )}

      <h1 className='font-bold text-2xl'> Welcome Back</h1>
      <p>please sign in to continue</p>

      <form>
        <section className='grid space-y-1'>
          <label htmlFor='Email font-bold'>Email</label>
          <Input
            value={userData.email}
            className='p-3 bg-white rounded-lg'
            placeholder='Doe'
            type={"text"}
            onChange={(e) => handleChange(e)}
            name={"email"}
          />

          <br />

          <label htmlFor='password font-bold'>Password</label>
          <HideShowComponent
            className={
              "absolute w-7 right-7 top-97 md:top-86 md:right-11 lg:right-17 lg:top-90 xl:top-94 xl:right-21 "
            }
            onClick={() => setShowpassword(!showpassword)}
            showPassword={showpassword}
          />

          <Input
            value={userData.password}
            className='py-3 pl-3 pr-15 bg-white rounded-lg'
            placeholder='Password'
            type={!showpassword ? "password" : "text"}
            onChange={(e) => handleChange(e)}
            name={"password"}
          />

          <br />

          <section className='space-x-2'>
            <Input type={"checkbox"} onChange={() => setAgree(!agree)} />
            <span> Remember me</span>
          </section>

          <br />

          <Button
            className={"bg-blue-800 text-white p-3 rounded-lg"}
            onClick={(e) => handleSubmit(e)}
          >
            Log In
          </Button>
        </section>
      </form>
    </div>
  );
}
