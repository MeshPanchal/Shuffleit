"use client";
import { useEffect, useState } from "react";
import { ListItem } from "../types";
import SearchComponent, {  } from "./SearchHeader";
import NestedList from "./NestedList";

function AdminHome() {
  const [subjectList, setList] = useState<ListItem[]>([]);

  useEffect(() => { 
     const stored = localStorage.getItem("nestedList");
     try{
        const list = JSON.parse(stored??"");
         if (list) {
            console.log("AdminHOme" ,list);
           setList(list);
         }
     }catch(e){
        console.log(e)
    }
    
  }, []);

  const addSubject = (list : ListItem[]) => {
    localStorage.setItem("nestedList", JSON.stringify(list));
  }

   const clearData = () => {
     localStorage.setItem("nestedList", "");
     setList([]);
   };

  return (
    <div className="min-h-screen bg-white text-gray-800 flex flex-col">
      {SearchComponent(subjectList, addSubject , clearData)}
      {NestedList(subjectList, addSubject)}
 
    </div>
  );
}

export default AdminHome;