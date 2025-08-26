import { useContext } from "react";
import { userDataContext } from "../context/UserDataContext";

export default function PaystackButton({
  email,
  amount,
  onClose,
  children,
  className,
}) {
  const { submitTransaction } = useContext(userDataContext);

  const payWithPaystack = () => {
    const handler = window.PaystackPop.setup({
      key: "pk_live_5d263b32c967270d5457d89ee8ef5dcd8dbe6f71",
      email: email,
      amount: amount * 100,
      currency: "NGN",
      callback: function (response) {
        console.log("Paystack callback received:", response);
        if (typeof submitTransaction === "function") {
          submitTransaction(response, amount);
        }
      },
      onClose,
    });

    handler.openIframe();
  };
  return (
    <button
      onClick={amount < 100 ? null : payWithPaystack}
      className={className}
    >
      {children}
    </button>
  );
}
