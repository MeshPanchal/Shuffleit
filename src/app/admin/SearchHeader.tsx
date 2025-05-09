"use client";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ListItem } from "../types";
import JsonUploadDialog from "./JsonModal";
import Link from "next/link";
import { TrashIcon } from "lucide-react";
import ConfirmDialog from "../ConfirmModal";
import { Bounce, toast, ToastContainer } from "react-toastify";

export default function SearchComponent(
  subjectList: ListItem[],
  addSubject: { (list: ListItem[]): void; (arg0: ListItem[]): void },
  clearData: () => void
) {
  const [query, setQuery] = useState("");
  // let [subjects] = useState<ListItem[]>([]);

  const handleSearch = () => {

    if (query.trim() === "") {
      return;
    }

    const listItem = new ListItem(uuidv4(), query, []);
    subjectList.push(listItem);
    addSubject(subjectList);

    setQuery("");
  };

  const [showDialog, setShowDialog] = useState(false);
  const [showConfirmDialog, setConfirmDialog] = useState(false);

  const [isSuccess, setSuccess] = useState<boolean>(false); //for json upload success

  useEffect(() => {
    if (isSuccess) {
      console.log("isSuccess", isSuccess);
      toast.success("JSON saved successfully!");
      // Reset the flag so it can be triggered again later

      const stored = localStorage.getItem("nestedList");
      try {
        const list = JSON.parse(stored ?? "");
        if (list) {
          console.log("AdminHOme", list);
          subjectList.splice(0, subjectList.length);
          subjectList.push(...list);
        }
      } catch (e) {
        console.log(e);
      }
      setSuccess(false);
    }
  }, [isSuccess, subjectList]);

  return (
    <div className="relative flex flex-col">
      {/*** header  */}

      <header className="fixed w-full flex items-center justify-between px-6 py-4 bg-white shadow-md inset-x-0 top-0 h-16 z-50">
        <h1 className=" text-xs font-sans p-2 uppercase inset-ring-amber-50 border-2 rounded-md font-semibold">
          Gate Topic
        </h1>

        <div className="flex flex-row">
          <Link
            href="/"
            className="bg-blue-400 hover:bg-blue-500 text-white px-4 py-1.5 rounded-md"
          >
            <p> User </p>
          </Link>

          <button
            className="px-1 py-1 ml-2 font-semibold self-center text-gray-800 border rounded-md bg-red-400 hover:bg-red-500  border-red-300 "
            onClick={() => {
              setConfirmDialog(true);
            }}
          >
            <TrashIcon></TrashIcon>
          </button>
        </div>
      </header>

      {/** show json success toast  */}
      <ToastContainer
        position="bottom-right"
        // autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />

      {/*** body section  */}
      <div className="p-6 pt-25 w-full overflow-hidden inset-x-0 flex flex-col justify-center items-center ">
        <div className="flex flex-col sm:flex-row  justify-center place-items-center">
          <div className="p-4 flex flex-row justify-center border border-gray-300 rounded-md">
            <input
              type="text"
              id="inputField"
              placeholder="Add Gate Subject"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="text-xs max-w-fit p-1  justify-center border border-gray-300 rounded-md "
            />
            <button
              id="button"
              className="text-xs min-w-12 bg-blue-400 hover:bg-blue-500 text-white ml-2 p-1 rounded-md sm:min-w-16"
              onClick={handleSearch}
            >
              Add
            </button>
          </div>

          <h1 className="ml-2 mt-2">OR</h1>

          <button
            className="ml-2 mt-2 border border-gray-300 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
            onClick={() => setShowDialog(true)}
          >
            Upload JSON
          </button>
        </div>

        {/** show json dialog here  */}
        <div>
          <JsonUploadDialog
            showDialog={showDialog}
            setShowDialog={setShowDialog}
            setSuccess={setSuccess}
          />
        </div>

        {/** show data clear confirm dialog here  */}
        {showConfirmDialog && (
          <div>
            <ConfirmDialog
              setConfirmDialog={setConfirmDialog}
              clearData={clearData}
            />
          </div>
        )}
      </div>
    </div>
  );
}

