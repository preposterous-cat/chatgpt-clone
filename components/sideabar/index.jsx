"use client";

import { FiEdit, FiGrid, FiMoreHorizontal, FiSidebar } from "react-icons/fi";
import { BsStars } from "react-icons/bs";
import { AiOutlineOpenAI } from "react-icons/ai";
import { Button } from "../ui/button";
import React, { useEffect, useState } from "react";
import rooms from "@/data/rooms";
import { intervalToDuration } from "date-fns";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import {
  setHoveredItem,
  setRoomData,
} from "@/lib/features/siderbar/sidebarSlice";

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const { roomData, hoveredItem } = useAppSelector((state) => state.sidebar);

  const handleMouseEnter = (key, index) => {
    dispatch(setHoveredItem({ key, index }));
  };

  const handleMouseLeave = () => {
    dispatch(setHoveredItem({ key: null, index: null }));
  };

  useEffect(() => {
    // Group rooms by createdAt
    const date = rooms.reduce((acc, room) => {
      const createdAt = room.createdAt;
      const title = room.title;
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
      acc[distance].push(title);
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

    dispatch(setRoomData(sortedDate));
  }, [dispatch]);

  if (!roomData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col">
      <div className=" flex justify-between text-gray-300 pb-2 px-5">
        <Button variant="ghost" className="px-1 py-0">
          <FiSidebar className=" text-xl" />
        </Button>

        <Button variant="ghost" className="px-1 py-0">
          <FiEdit className="text-xl" />
        </Button>
      </div>
      <div className="flex flex-col text-gray-300 max-h-[480px] overflow-auto ps-2">
        <div className="flex flex-col mb-6">
          <Button
            onMouseEnter={() => handleMouseEnter("main", -1)}
            onMouseLeave={handleMouseLeave}
            variant="ghost"
            className="flex justify-between ps-3"
          >
            <div className=" inline-flex items-center">
              <AiOutlineOpenAI className="me-2 text-xl" /> <p>ChatGPT</p>
            </div>
            {hoveredItem.key === "main" && hoveredItem.index === -1 && (
              <div
                onClick={() => console.log("clicked")}
                className=" hover:text-white"
              >
                <FiEdit />
              </div>
            )}
          </Button>

          <Button variant="ghost" className="flex justify-between ps-3">
            <div className=" inline-flex items-center">
              <FiGrid className="me-2 text-xl" /> <p>Explore GPTs</p>
            </div>
          </Button>
        </div>

        <div className="flex flex-col ps-2">
          {Object.keys(roomData).map((key) => (
            <div key={key} className="flex flex-col mb-10">
              <div className="text-xs text-gray-400 ps-2">{key}</div>
              {roomData[key].map((item, j) => (
                <Button
                  variant="ghost"
                  key={j}
                  onMouseEnter={() => handleMouseEnter(key, j)}
                  onMouseLeave={handleMouseLeave}
                  className="ps-2 mt-1 flex justify-between"
                >
                  <div className=" inline-flex items-center w-full">
                    <p className=" text-clip overflow-hidden">{item}</p>
                  </div>
                  {hoveredItem.key === key && hoveredItem.index === j && (
                    <div
                      onClick={() => console.log("clicked")}
                      className=" hover:text-white"
                    >
                      <FiMoreHorizontal />
                    </div>
                  )}
                </Button>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className=" mx-2 mt-1">
        <Button
          variant="ghost"
          className="flex items-center gap-2 ps-5 w-full py-7"
        >
          <div className=" rounded-full p-1 border border-gray-700">
            <BsStars className="text-white" />
          </div>
          <div className="flex flex-col text-start">
            <p className="text-white text-sm">Upgrade Plan</p>
            <p className="text-xs text-gray-600">Get GPT-4, DALL-E, and more</p>
          </div>
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
