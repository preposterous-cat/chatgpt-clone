import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  roomData: null,
  hoveredItem: { key: null, index: null },
};

const sidebarSlicer = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    setRoomData: (state, action) => {
      state.roomData = action.payload;
    },
    setHoveredItem: (state, action) => {
      state.hoveredItem = action.payload;
    },
  },
});

export const { setRoomData, setHoveredItem } = sidebarSlicer.actions;

export default sidebarSlicer.reducer;
