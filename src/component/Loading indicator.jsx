export function LoadingIndicator1({ className }) {
  return (
    <div
      className={`w-17 h-17 border-t-transparent border-b-transparent border-9 animate-spin absolute border-l-teal-400 border-r-amber-300 rounded-full bg-transparent ${className}
    `}
    >
      <div className='w-full'></div>
    </div>
  );
}

export function InteractionBlocker({ className, children }) {
  return (
    <div className='bg-transparent w-screen h-screen fixed top-0 left-0'>
      {children}
    </div>
  );
}
