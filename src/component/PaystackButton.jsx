export default function PaystackButton({
  email,
  amount,
  onSuccess,
  onClose,
  children,
  className,
}) {
  const payWithPaystack = () => {
    const handler = window.PaystackPop.setup({
      key: "pk_live_5d263b32c967270d5457d89ee8ef5dcd8dbe6f71",
      email: email,
      amount: amount * 100,
      currency: "NGN",
      callBack: onSuccess,
      onClose,
    });

    handler.openIframe();
  };
  return (
    <button
      onClick={amount < 3000 ? null : payWithPaystack}
      className={className}
    >
      {children}
    </button>
  );
}
