import { useState } from "react";
import { PlusIcon } from "lucide-react";

export const AddSubItemForm = ({
  onAdd,
}: {
  onAdd: (text: string) => void;
}) => {
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    if (!value.trim()) return;
    onAdd(value.trim());
    setValue("");
  };

  return (
    <div className="flex flex-row mt-1 pt-1">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Add sub-item"
        className="border-1 w-full shadow-sm  border-gray-300 rounded-md p-1 max-w-fit focus:ring-1 focus:ring-blue-500 focus:outline-none transition"
      />
      <button
        className="group relative inline-flex items-center ml-2 px-2 py-2 rounded-md bg-blue-400 text-xs border-0 hover:bg-blue-500 text-black"
        onClick={handleSubmit}
      >
        <PlusIcon className="w-3 h-4" />
      </button>
    </div>
  );
};
