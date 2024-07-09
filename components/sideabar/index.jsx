"use client";

import { FiEdit, FiGrid, FiSidebar } from "react-icons/fi";
import { AiOutlineOpenAI } from "react-icons/ai";
import { Button } from "../ui/button";
import { useRef } from "react";

const Sidebar = () => {
  const hooverToggle = useRef(null);

  const handleEnterHooverToggle = () => {
    hooverToggle.current.style.display = "block";
  };

  const handleLeaveHooverToggle = () => {
    hooverToggle.current.style.display = "none";
  };

  return (
    <div className="flex flex-col">
      <div className=" flex justify-between text-gray-300 pb-2">
        <Button variant="ghost" className="px-1 py-0">
          <FiSidebar className=" text-xl" />
        </Button>

        <Button variant="ghost" className="px-1 py-0">
          <FiEdit className="text-xl" />
        </Button>
      </div>
      <div className="flex flex-col text-gray-300">
        <div className="flex flex-col mb-6">
          <Button
            onMouseEnter={handleEnterHooverToggle}
            onMouseLeave={handleLeaveHooverToggle}
            variant="ghost"
            className="flex justify-between  px-1"
          >
            <div className=" inline-flex items-center">
              <AiOutlineOpenAI className="me-2 text-xl" /> <p>ChatGPT</p>
            </div>
            <div
              ref={hooverToggle}
              style={{ display: "none" }}
              onClick={() => console.log("clicked")}
              className=" hover:text-white"
            >
              <FiEdit />
            </div>
          </Button>

          <Button variant="ghost" className="flex justify-between  px-1">
            <div className=" inline-flex items-center">
              <FiGrid className="me-2 text-xl" /> <p>Explore GPTs</p>
            </div>
          </Button>
        </div>
        <div className="flex flex-col mb-6">
          <Button
            onMouseEnter={handleEnterHooverToggle}
            onMouseLeave={handleLeaveHooverToggle}
            variant="ghost"
            className="flex justify-between  px-1"
          >
            <div className=" inline-flex items-center">
              <AiOutlineOpenAI className="me-2 text-xl" /> <p>ChatGPT</p>
            </div>
            <div
              ref={hooverToggle}
              style={{ display: "none" }}
              onClick={() => console.log("clicked")}
              className=" hover:text-white"
            >
              <FiEdit />
            </div>
          </Button>

          <Button variant="ghost" className="flex justify-between  px-1">
            <div className=" inline-flex items-center">
              <FiGrid className="me-2 text-xl" /> <p>Explore GPTs</p>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
