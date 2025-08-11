import Header from "../layout/Header";
import Overview from "../layout/Overview";

export default function Dashboard() {
  return (
    <div className="bg-gray-100 p-3 min-h-screen z-4 md:ml-[30%] lg:ml-[25%] md:w-[70%] lg:w-[75%] ">
      <Header Page='Dashboard' />
      <Overview/>
    </div>
  );
}
