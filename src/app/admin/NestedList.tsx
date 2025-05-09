"use client"; // if you're using Next.js with App Router

import { ListItem } from "../types"; // adjust the path as needed
import { v4 as uuidv4 } from "uuid";
import { MultiColumnTree } from "../components/MultiColumnTree";
import { useEffect } from "react";

const NestedList = (subjectList: ListItem[], addSubject: (list: ListItem[]) => void) => {

  const addSubItem = (parentId: string, text: string) => {
    const addRecursive = (items: ListItem[]): ListItem[] =>
      items.map((item) => {
        if (item.id === parentId) {
          // item.subItems.push(text)
          return {
            ...item,
            subItems: [...item.subItems, { id: uuidv4(), text, subItems: [] }],
          };
        } else {
          return { ...item, subItems: addRecursive(item.subItems) };
        }
      });

    const newList = addRecursive(subjectList??[]);
    subjectList.splice(0, subjectList.length);
    subjectList.push(...newList); 
    addSubject(subjectList);
  };

  useEffect(()=>{
   console.log("list changed")
  },[subjectList])

  const deleteItem = (itemId: string) => {

    const deleteRecursive = (
      items: ListItem[],
      itemIdToDelete: string
    ): ListItem[] => {

      return items
        .filter((item) => item.id !== itemIdToDelete) // Remove the item if it matches
        .map((item) => ({
          ...item,
          subItems: deleteRecursive(item.subItems, itemIdToDelete), // Recursively clean subItems
        }));
    }
    
     const newList = deleteRecursive(subjectList ?? [] , itemId);
     console.log("delete item", newList)
     subjectList.splice(0, subjectList.length);
     subjectList.push(...newList);
     addSubject(subjectList);

  };

 
  return (
    <div className="w-full justify-between py-2">
      <div className="flex flex-col justify-between">
        {/* subject title */}
        <h1 className="flex w-full justify-center items-center font-bold text-xl">Subjects</h1>

        {/* this is subject tree  */}
        <MultiColumnTree
          data={subjectList}
          addSubItem={addSubItem}
          deleteItem={deleteItem}
        />
      </div>
    </div>
  );
};

export default NestedList;
