import { FiEdit, FiSidebar } from "react-icons/fi";
import { Button } from "../ui/button";

const Sidebar = () => {
  return (
    <>
      <div className=" flex justify-between text-gray-300">
        <Button
          variant="ghost"
          className="px-2 py-0 hover:bg-gray-800 hover:text-gray-300"
        >
          <FiSidebar className=" text-xl" />
        </Button>

        <Button
          variant="ghost"
          className="px-2 py-0 hover:bg-gray-800 hover:text-gray-300"
        >
          <FiEdit className="text-xl" />
        </Button>
      </div>
    </>
  );
};

export default Sidebar;
