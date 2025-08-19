import { createContext, useState } from "react";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";

export const userDataContext = createContext();

export default function UserDataProvider({ children }) {
  const [referralData, setReferralData] = useState({
    link: "",
    points: 0,
    email: "",
    Firstname: "",
    Lastname: "",
    activeInvestment: 0,
    availableBalance: 0,
  });
  const [refList, setRefList] = useState([]);

  //this particular amount state is used here incase a person had made payment and mistakenly exit the deposit page, the payment will still continue
  const [amount, setAmount] = useState(0);

  const [currentUser, setCurrentUser] = useState(
    sessionStorage.getItem("kinnex-login") ||
      localStorage.getItem("kinnex-login")
  );

  // if useEffect is used, itll throw an error if the user isnt logged in. check mainpage componenent for more info
  const getUserData = () => {
    //get referral details
    console.log(currentUser);
    onAuthStateChanged(auth, (user) => {
      if (currentUser) {
        const docRef = doc(db, "users", currentUser);
        getDoc(docRef).then((docsnap) => {
          if (docsnap.exists()) {
            const userData = docsnap.data();
            setReferralData({
              link: `kinnex-rho.vercel.app/registration/signup?ref=${userData.ReferralCode}`,
              points: userData.referralCount,
              email: userData.Email,
              Firstname: userData.Firstname,
              Lastname: userData.Lastname,
              activeInvestment: userData.activeInvestment,
              availableBalance: userData.availableBalance,
            });
          }
        });
      }
    });

    //get referral collection
    const referralRef = collection(db, "users", currentUser, "refs");
    const q = query(referralRef, orderBy("date"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const refs = snapshot.docs.map((docs) => ({
        id: docs.id,
        date: docs.data().date,
        name: docs.data().name,
      }));

      setRefList(refs);
    });

    return () => unsubscribe();
  };

  //submit transaction to database after payment
  const submitTransaction = (response, amount) => {
    if (!currentUser) {
      console.error("⚠️ No logged in user. Cannot submit transaction.");
      return;
    }
    const transactionRef = collection(db, "users", currentUser, "transaction");
    const date = new Date();
    addDoc(transactionRef, {
      date: date.toLocaleDateString("default", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      amount: amount,
    })
      .then((res) => {
        console.log(response);
        toast.success("transaction successful");
      })
      .catch((res) => {
        console.log(res, "transaction error");
        toast.success("transaction error");
      });
  };

  return (
    <userDataContext.Provider
      value={{
        referralData,
        refList,
        getUserData,
        setCurrentUser,
        submitTransaction,
        amount,
        setAmount,
      }}
    >
      {children}
    </userDataContext.Provider>
  );
}
