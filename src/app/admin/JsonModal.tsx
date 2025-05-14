"use client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setSubjectList } from "../store/slices/subjectListSlice";

const initialData = [
  {
    id: "1",
    text: "Engineering Mathematics",
    subItems: [
      {
        id: "1-1",
        text: "Discrete Mathematics",
        subItems: [
          {
            id: "1-1-1",
            text: "Propositional and First-Order Logic",
            subItems: [],
          },
          {
            id: "1-1-2",
            text: "Sets, Relations, and Functions",
            subItems: [],
          },
          {
            id: "1-1-3",
            text: "Graph Theory",
            subItems: [],
          },
          {
            id: "1-1-4",
            text: "Group Theory",
            subItems: [],
          }
        ],
      },
      {
        id: "1-2",
        text: "Linear Algebra",
        subItems: [],
      },
      {
        id: "1-3",
        text: "Calculus",
        subItems: [],
      },
    ],
  },
  {
    id: "2",
    text: "Digital Logic",
    subItems: [],
  },
  {
    id: "3",
    text: "Algorithms",
    subItems: [],
  },
  {
    id: "4",
    text: "Computer Organization and Architecture",
    subItems: [],
  },
  {
    id: "5",
    text: "Operating Systems",
    subItems: [],
  }
];

interface JsonUploadDialogProps {
  showDialog: boolean;
  setShowDialog: (arg0: boolean) => void;
  setSuccess: (arg0: boolean) => void;
}

const JsonUploadDialog: React.FC<JsonUploadDialogProps> = ({
  showDialog,
  setShowDialog,
  setSuccess,
}) => {
  const [jsonText, setJsonText] = useState(JSON.stringify(initialData));
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const handleSave = () => {
    try {
      const parsed = JSON.parse(jsonText);

      // localStorage.setItem("nestedList", JSON.stringify(parsed));
      //set subject list in redux store and it automatically saves in local storage
      dispatch(setSubjectList(parsed)) ; 

      setJsonText("");
      setError("");
      console.log("JSON saved:", parsed);
      setSuccess(true);
      setShowDialog(false);
    } catch (err) {
      console.log(err);
      setError("Invalid JSON format.");
    }
  };


  return (
    <div>
      {showDialog && (
        <div className="fixed inset-0 bg-gray-600/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in place-content-center">
          <div className="justify-center  sm:flex sm:flex-col text-center sm:items-center sm:p-6">
            <div className=" justify-center flex sm:flex sm:flex-row">
              <div className="p-4 bg-white rounded-lg sm:p-4 h-fit shadow-lg  ">
                <h2 className="text-sm font-semibold pl-2 pt-2  justify-self-center">
                  Upload JSON
                </h2>

                <textarea
                  value={jsonText}
                  onChange={(e) => setJsonText(e.target.value)}
                  rows={15}
                  placeholder="Paste your JSON here..."
                  className="border border-gray-300 rounded-md m-2 sm:p-2 sm:w-xs font-mono text-sm"
                />

                {error && (
                  <p className="text-red-500 p-2 justify-self-start text-sm">
                    {error}
                  </p>
                )}

                <div className="text-sm flex justify-end space-x-3 px-4 py-2 sm:flex sm:flex-row sm:px-6">
                  <button
                    onClick={() => {
                      setShowDialog(false); 
                    }}
                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      handleSave();
                    }}
                    className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JsonUploadDialog;
