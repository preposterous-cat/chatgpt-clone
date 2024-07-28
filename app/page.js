import Sidebar from "@/components/sideabar";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center">
      <div className=" bg-gray-900 min-h-screen  py-2 w-64">
        <Sidebar />
      </div>
      <div className=" bg-gray-800 grow min-h-screen">Room chat</div>
    </main>
  );
}
