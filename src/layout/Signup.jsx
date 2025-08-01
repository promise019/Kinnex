import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import Input from "../component/Input";
import { Link, useNavigate } from "react-router";
import Button from "../component/Button";
import HideShowComponent from "../component/Show_Hide";

import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  increment,
  where,
  serverTimestamp,
  addDoc,
} from "firebase/firestore";
import { toast, ToastContainer } from "react-toastify";
import { LoadingIndicator1 } from "../component/Loading indicator";

export default function Signup() {
  const [searchParams] = useSearchParams();
  const [referrerCode, setReferrerCode] = useState(null);

  // get and set referrer code on-mount
  useEffect(() => {
    const code = searchParams.get("ref");
    if (code) setReferrerCode(code);
  }, [searchParams]);

  const [showpassword, setShowpassword] = useState(false);
  const [agree, setAgree] = useState(true); //terms and conditions and privacy policy
  const [isloading, setIsloading] = useState(false); //loading component

  const navigate = useNavigate();

  //make users unable to submit data twice by disabling the submit button
  useEffect(() => {
    isloading ? setAgree(false) : setAgree(true);
  }, [isloading]);

  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const { firstname, lastname, email, password } = userData;

  //input onchange handler
  const handleChange = (e) => {
    const { value, name } = e.target;

    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  //user data submission logic
  function handleSubmit(e) {
    e.preventDefault();

    if (firstname === "" || lastname === "" || email === "")
      return toast.error("Please fill the form below");

    setIsloading(true);

    createUserWithEmailAndPassword(auth, email, password)
      .then((usercredential) => {
        const user = usercredential.user;
        const docRef = doc(db, "users", user.uid);

        // Check if referral code exists
        if (referrerCode) {
          console.log(referrerCode);
          const refQuery = query(
            collection(db, "users"),
            where("ReferralCode", "==", referrerCode)
          );

          //get corresponding document
          getDocs(refQuery)
            .then((refSnap) => {
              if (!refSnap.empty) {
                const referrer = refSnap.docs[0];
                const referrerUID = referrer.id;

                // Increment referrer's referralCount
                const referrerDocRef = doc(db, "users", referrerUID);
                updateDoc(referrerDocRef, {
                  referralCount: increment(1),
                });

                //create a collection of users
                const refs = collection(db, "users", referrerUID, "refs");
                const date = new Date();
                addDoc(refs, {
                  date: date.toLocaleDateString("default", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  }),
                  name: firstname,
                });

                // Save new user with referrer info
                return setDoc(docRef, {
                  Firstname: firstname,
                  Lastname: lastname,
                  Email: email,
                  ReferralCode: user.uid,
                  ReferredBy: referrerCode,
                  createdAt: serverTimestamp(),
                  referralCount: 0,
                  
                });
              } else {
                // Referral code not found, proceed without it
                return setDoc(docRef, {
                  Firstname: firstname,
                  Lastname: lastname,
                  Email: email,
                  ReferralCode: user.uid,
                  ReferredBy: null,
                  createdAt: serverTimestamp(),
                  referralCount: 0,
                 
                });
              }
            })
            .then(() => {
              toast.success("Account successfully created");
              setIsloading(false);
              navigate("/registration/login");
            })
            .catch((err) => {
              console.log(err.code);
              toast.error("Error creating account");
              setIsloading(false);
              setAgree(false);
            });
        } else {
          // No referral code provided
          setDoc(docRef, {
            Firstname: firstname,
            Lastname: lastname,
            Email: email,
            ReferralCode: user.uid,
            ReferredBy: null,
            createdAt: serverTimestamp(),
            referralCount: 0,
           
          })
            .then(() => {
              toast.success("Account successfully created");
              setIsloading(false);
              navigate("/registration/login");
            })
            .catch((err) => {
              console.log(err.code);
              toast.error("Error creating account");
              setIsloading(false);
              setAgree(false);
            });
        }
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/email-already-in-use":
            toast.error("email already in use");
            break;
          case "auth/invalid-email":
            toast.error("invalid email");
            break;
          case "auth/weak-password":
            toast.error("weak password");
            break;
          default:
            toast.error("unable to create user");
            break;
        }
        setIsloading(false);
        console.log(error.code);
      })
      .finally(() => {
        setIsloading(false);
        setAgree(false);
      });
  }

  return (
    <div className='space-y-2 '>
      <ToastContainer />

      {isloading && (
        <LoadingIndicator1 className={"top-75 ml-[39%] md:ml-[17%]"} />
      )}

      <h1 className='font-bold text-2xl'> Create an account</h1>
      <p>Start your investment journey with Kinnex</p>

      <form>
        <section className='grid grid-cols-2 space-x-2'>
          <label htmlFor='First Name' className='font-bold'>
            First Name
          </label>

          <label htmlFor='First Name' className='font-bold'>
            Last Name
          </label>

          <Input
            value={userData.firstname}
            className='p-3 bg-white rounded-lg'
            placeholder='John'
            type={"text"}
            onChange={(e) => handleChange(e)}
            name='firstname'
            required={true}
          />

          <Input
            value={userData.lastname}
            className='p-3 bg-white rounded-lg'
            placeholder='Doe'
            type={"text"}
            onChange={(e) => handleChange(e)}
            name={"lastname"}
            required={true}
          />

          <br />
        </section>

        <section className='grid space-y-1'>
          <label htmlFor='Email font-bold'>Email</label>
          <Input
            value={userData.email}
            className='p-3 bg-white rounded-lg'
            placeholder='Doe'
            type={"text"}
            onChange={(e) => handleChange(e)}
            name={"email"}
            required={true}
          />

          <HideShowComponent
            className={
              "w-7 absolute top-104 right-7 md:top-93 md:right-11 lg:top-97 lg:right-13 xl:right-21 xl:top-102"
            }
            onClick={() => setShowpassword(!showpassword)}
            showPassword={showpassword}
          />

          <label htmlFor='password font-bold'>Password</label>
          <Input
            value={userData.password}
            className='py-3 pl-3 pr-15 bg-white rounded-lg'
            placeholder='Password'
            type={!showpassword ? "password" : "text"}
            onChange={(e) => handleChange(e)}
            name={"password"}
            required={true}
          />
          <p className='text-sm'>
            Password must be atleast 8 characters with a number and special
            character
          </p>
          <br />

          <section className='space-x-2'>
            <Input
              type={"checkbox"}
              onChange={() => setAgree(!agree)}
              value={agree}
            />
            <span>
              I agree to the{" "}
              <Link className='text-blue-600'>Terms of Service</Link> and{" "}
              <Link className='text-blue-600'>Privacy Policy</Link>
            </span>
          </section>

          <br />

          <Button
            disabled={agree}
            className={
              "bg-blue-800 text-white p-3 rounded-lg disabled:bg-blue-400"
            }
            onClick={(e) => (handleSubmit(e), console.log("create"))}
          >
            Create account
          </Button>
        </section>
      </form>
    </div>
  );
}
