"use client";
// import { useEffect, useState } from "react";
// import { ListItem } from "../types";
import SearchComponent, {  } from "./SearchHeader";
import NestedList from "./NestedList";

function AdminHome() {

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-800 ">
      <SearchComponent />
      <NestedList />
    </div>
  );
}

export default AdminHome;