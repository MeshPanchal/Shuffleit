import { TrashIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import ConfirmDialog from "../components/ConfirmModal";

export default function AdminHeader() {
  const [showConfirmDialog, setConfirmDialog] = useState(false);

  return (
    <header className="fixed w-full flex items-center justify-between px-6 py-4 bg-white shadow-md inset-x-0 top-0 h-16 z-50">
      <h1 className=" text-xs font-sans p-2 uppercase inset-ring-amber-50 border-2 rounded-md font-semibold">
        Gate Topic
      </h1>

      <div className="flex flex-row">
        <Link
          href="/"
          className="border border-gray-300 hover:bg-gray-300 text-black px-3 py-1 rounded-md"
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

        {/** show data clear confirm dialog here  */}
        {showConfirmDialog && (
          <div>
            <ConfirmDialog setConfirmDialog={setConfirmDialog} />
          </div>
        )}
      </div>
    </header>
  );
}
