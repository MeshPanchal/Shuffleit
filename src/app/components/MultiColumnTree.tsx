"use client";

import { use, useEffect, useState } from "react";
import { ArrowRight, PlusIcon, TrashIcon } from "lucide-react";
import { ListItem } from "../types";

interface MultiColumnTreeProps {
  data: ListItem[];
  addSubItem: (id: string, value: string) => void;
  deleteItem: (id: string) => void;
}

export const MultiColumnTree = ({
  data,
  addSubItem,
  deleteItem,
}: MultiColumnTreeProps) => {

  // const [list, setList] = useState<ListItem[]>(data);
  // useEffect(() => {
  //   setList(data);
  // }, [data]); 


  const [path, setPath] = useState<string[]>([]);
  const [inputValues, setInputValues] = useState<Record<string, string>>({});
  const levels = [...Array(path.length + 1).keys()];

  const getItemsAtLevel = (level: number) => {
    let items = data;
    for (let i = 0; i < level; i++) {
      const selected = path[i];
      items = items.find((item) => item.id === selected)?.subItems || [];
    }
    return items;
  };

  function moveItemToTopById(list: ListItem[], itemId: string): ListItem[] {
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
  }


  const handleItemClick = (level: number | undefined, id: string) => {

    console.log("handleItemClick", data);
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
