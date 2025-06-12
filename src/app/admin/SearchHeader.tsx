"use client";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ListItem } from "../types";
import JsonUploadDialog from "./JsonModal";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import { RootState } from "../store/store"; 
import { useDispatch } from "react-redux";
import { setSubjectList} from "../store/slices/subjectListSlice"; 
import AdminHeader from "./AdminHeader";


export default function SearchComponent(){
  const [query, setQuery] = useState("");

  const subjectList:ListItem[] = useSelector(
    (state: RootState) => state.subjectListStore.subjectList)
  const dispatch = useDispatch();

  const handleAddSubject = () => {
    if (query.trim() === "") return;

    // Create a plain serializable object
    const listItem = {
      id: uuidv4(),
      text: query,
      children: [],
    };

    console.log("new Item id:", listItem.id);
    // Shallow copy and add the new item
    const list = [...subjectList, listItem];

    // Dispatch the new list
    dispatch(setSubjectList(list));

    setQuery("");
  };

  const [showDialog, setShowDialog] = useState(false); //for json upload dialog
  const [isSuccess, setSuccess] = useState<boolean>(false); //for json upload success

  useEffect(() => {
    if (isSuccess) {
      toast.success("JSON saved successfully!");
      // Reset the flag so it can be triggered again later
      setSuccess(false);
    }
  }, [isSuccess]);

  return (
    <div className="relative flex flex-col">
      {/*** this is Admin Header component  */}
      <AdminHeader />

      {/** ToastContainer for json success toast  */}
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
        <div className="flex flex-col w-full sm:flex-row  justify-center place-items-center">
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
              onClick={handleAddSubject}
            >
              Add
            </button>
          </div>

          <h2 className="ml-2 mt-2">OR</h2>

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
      </div>
    </div>
  );
}

