"use client";

import {useState } from "react";
import { ArrowRight, PlusIcon, TrashIcon } from "lucide-react";
import { RootState } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { ListItem } from "../types";
import { setSubjectList } from "../store/slices/subjectListSlice";
import { v4 as uuidv4 } from "uuid";

export function MultiColumnTree(){

  const subjectList = useSelector(
    (state: RootState) => state.subjectListStore.subjectList
  );
  const dispatch = useDispatch();

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

    const newList = addRecursive(subjectList ?? []);
    dispatch(setSubjectList(newList));  // update the redux store

    // subjectList.splice(0, subjectList.length);
    // subjectList.push(...newList);
    // addSubject(subjectList);
  };


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
    };

    const newList = deleteRecursive(subjectList ?? [], itemId);
    dispatch(setSubjectList(newList));
    console.log("delete item", newList);

    //  subjectList.splice(0, subjectList.length);
    //  subjectList.push(...newList);
    //  addSubject(subjectList);
  };


  const [path, setPath] = useState<string[]>([]);
  const [inputValues, setInputValues] = useState<Record<string, string>>({});
  const levels = [...Array(path.length + 1).keys()];

  const getItemsAtLevel = (level: number) => {
    let items = subjectList;
    for (let i = 0; i < level; i++) {
      const selected = path[i];
      items = items.find((item) => item.id === selected)?.subItems || [];
    }
    return items;
  };

 /* function moveItemToTopById(list: ListItem[], itemId: string): ListItem[] {
    function recursiveMove(list: ListItem[]): ListItem[] {
      let modified = false;
  
      const index = list.findIndex(item => item.id === itemId);
      if (index > -1) {
        // Move found item to top of this list
        const [found] = list.splice(index, 1);
        list.unshift(found);
        return list;
      }
  
      // Otherwise, go deeper
      const newList = list.map(item => {
        if (item.subItems) {
          const updatedSub = recursiveMove([...item.subItems]);
          if (updatedSub !== item.subItems) {
            modified = true;
            return { ...item, subItems: updatedSub };
          }
        }
        return item;
      });
  
      return modified ? newList : list;
    }

    return recursiveMove([...list]);
  }*/


  const handleItemClick = (level: number | undefined, id: string) => {

    const newPath = [...path.slice(0, level), id];
    setPath(newPath);

    // const newList = moveItemToTopById(list, id);
    // setList(newList);
  };

  const handleInputChange = (id: string, value: string) => {
    setInputValues((prev) => ({ ...prev, [id]: value }));
  };

  const getInputValue = (id: string) => inputValues[id] || "";

  return (
    <div className="flex flex-wrap">
      <div className="bg-white flex flex-row gap-4 p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12">
        {levels.map((level) => {
          const items = getItemsAtLevel(level);

          return (
            <div
              key={level}
              className="felx flex-row gap-4 w-full bg-white p-4"
            >
              {items.map((item: { id: string; text: string }) => (
                <div
                  key={item.id}
                  onClick={() => handleItemClick(level, item.id)}
                  className={`mb-3 max-w-xs flex flex-row border border-gray-300 shadow-gray-300 bg-white p-2 rounded-md shadow-md transition hover:shadow-2xl cursor-pointer ${
                    path[level] === item.id ? "ring-2 ring-blue-500" : ""
                  }`}
                >
                  <div className="flex flex-row justify-between sm:justify-between mb:justify-between xl:justify-between">
                    <div className="flex flex-col mr-2 min-h-fit w-full justify-around text-[12px] ">
                      <p className=" w-[200px] break-words">{item.text}</p>

                      <input
                        type="text"
                        value={getInputValue(item.id)}
                        onChange={(e) =>
                          handleInputChange(item.id, e.target.value)
                        }
                        placeholder="Add sub-item"
                        className="border-1 mt-2 shadow-sm border-gray-300 rounded-md p-1 focus:ring-1 focus:ring-blue-500 focus:outline-none transition"
                      />
                    </div>

                    <div className="flex flex-col gap-y-1 justify-between sm:justify-end ">
                      <button
                        className="px-2 py-1 rounded-md bg-red-400 hover:bg-red-500 text-black font-medium group"
                        onClick={() => deleteItem(item.id)}
                      >
                        <TrashIcon className="w-3 h-4" />
                      </button>

                      <button
                        className="px-2 py-1 rounded-md bg-green-400 hover:bg-green-500 text-black font-medium group"
                        onClick={() => handleItemClick(level, item.id)}
                      >
                        <ArrowRight className="w-3 h-4" />
                      </button>

                      <button
                        className="px-2 py-1 rounded-md bg-blue-400 text-xs hover:bg-blue-500 text-black"
                        onClick={() => {
                          const value = getInputValue(item.id);
                          if (!value.trim()) return;
                          addSubItem(item.id, value.trim());
                          handleInputChange(item.id, "");
                        }}
                      >
                        <PlusIcon className="w-3 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};
