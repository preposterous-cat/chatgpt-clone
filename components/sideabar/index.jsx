"use client";

import { FiEdit, FiGrid, FiSidebar } from "react-icons/fi";
import { AiOutlineOpenAI } from "react-icons/ai";
import { Button } from "../ui/button";
import React, { useEffect, useRef } from "react";
import rooms from "@/data/rooms";
import { formatDistanceToNow, intervalToDuration } from "date-fns";

const Sidebar = () => {
  const hooverToggle = useRef(null);
  const roomsToggle = useRef(rooms.map(() => React.createRef()));

  const handleEnterHooverToggle = (index = -1) => {
    if (index == -1) {
      hooverToggle.current.style.display = "block";
    } else {
      roomsToggle.current[index].style.display = "block";
    }
  };

  const handleLeaveHooverToggle = (index = -1) => {
    if (index == -1) {
      hooverToggle.current.style.display = "none";
    } else {
      roomsToggle.current[index].style.display = "none";
    }
  };

  useEffect(() => {
    //Group room by createdAt
    const date = rooms.reduce((acc, room) => {
      const createdAt = room.createdAt;
      const dateOfCreatedAt = new Date(createdAt);
      const dateOfToday = new Date();

      let distance = "";
      const intervalDuration = intervalToDuration({
        start: dateOfCreatedAt,
        end: dateOfToday,
      });

      if (
        !intervalDuration.years &&
        !intervalDuration.months &&
        !intervalDuration.days
      ) {
        distance = "Today";
      } else if (
        !intervalDuration.years &&
        !intervalDuration.months &&
        intervalDuration.days <= 7
      ) {
        distance = "Previous 7 days";
      } else if (
        !intervalDuration.years &&
        !intervalDuration.months &&
        intervalDuration.days <= 30
      ) {
        distance = "Previous 30 days";
      } else if (!intervalDuration.years && intervalDuration.months > 0) {
        distance = dateOfCreatedAt.toLocaleString("default", { month: "long" });
      } else {
        distance = dateOfCreatedAt.getFullYear();
      }
      if (!acc[distance]) {
        acc[distance] = [];
      }
      acc[distance].push(createdAt);
      return acc;
    }, {});

    // Define the order of the categories
    const order = ["Today", "Previous 7 days", "Previous 30 days"];

    // Sort the keys based on the defined order and then by month/year
    const sortedKeys = Object.keys(date).sort((a, b) => {
      // If both a and b are in the order array
      if (order.includes(a) && order.includes(b)) {
        return order.indexOf(a) - order.indexOf(b);
      }
      // If only a is in the order array
      if (order.includes(a)) {
        return -1;
      }
      // If only b is in the order array
      if (order.includes(b)) {
        return 1;
      }
      // If both a and b are not in the order array, compare as month/year
      if (isNaN(a) && isNaN(b)) {
        return (
          new Date(`1 ${a} 2000`).getMonth() -
          new Date(`1 ${b} 2000`).getMonth()
        );
      }
      // Compare as year
      return a - b;
    });

    // Create a new object with sorted keys
    const sortedDate = sortedKeys.reduce((acc, key) => {
      acc[key] = date[key];
      return acc;
    }, {});
  }, []);

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
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
