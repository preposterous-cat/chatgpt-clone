import { configureStore } from "@reduxjs/toolkit";
import sidebarSlice from "./features/siderbar/sidebarSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      sidebar: sidebarSlice,
    },
  });
};
