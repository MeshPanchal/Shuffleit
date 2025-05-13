"use client"; // if you're using Next.js with App Router

import { MultiColumnTree } from "../components/MultiColumnTree";

function NestedList() {

  return (
    <div className="w-full justify-between py-2">
      <div className="flex flex-col justify-between">
        {/* subject title */}
        <h1 className="flex w-full justify-center self-center font-bold text-xl">Subjects</h1>

        {/* this is subject tree  */}
        <MultiColumnTree />
      </div>
    </div>
  );
};

export default NestedList;
