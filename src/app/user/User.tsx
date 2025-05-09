"use client"; // Only if using App Router

import { useState, useEffect } from "react";

import Link from "next/link";
import {} from "react";
import { ListItem } from "../types";
import { TreeNode } from "./TreeNode";
import { Shuffle } from "lucide-react";

function User() {
  const [subjects, setSubjects] = useState<ListItem[]>([]);
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>("");

  const [randomTopics, setRandomTopics] = useState<ListItem[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("nestedList");
    try {
      const list = JSON.parse(stored ?? "");
      if (list) {
        console.log(list);
        setSubjects(list);
      }
    } catch (e) {
      console.log(e);
    }
  }, []);

  const selectedSubject: ListItem | undefined = subjects.find(
    (s) => s.id == selectedSubjectId
  );

  // Flatten nested topics recursively
  const flattenTopics = (items: ListItem[]): ListItem[] => {
    let flat: ListItem[] = [];
    for (const item of items) {
      if (item.subItems && item.subItems.length > 0) {
        flat = flat.concat(flattenTopics(item.subItems));
      } else {
        flat.push({ id: item.id, text: item.text, subItems: item.subItems });
      }
    }
    return flat;
  };

  // Shuffle handler
  const handleShuffle = () => {
    const allLeafTopics = flattenTopics(selectedSubject?.subItems ?? subjects);
    const shuffled = [...allLeafTopics].sort(() => 0.5 - Math.random());
    setRandomTopics(shuffled.slice(0, 5));
  };

  // Util to recursively filter tree based on topic IDs
  function filterTreeByTopicIds(
    tree: ListItem[],
    topicIds: string[]
  ): ListItem[] {
    if (!tree || tree.length === 0) return [];

    return (
      tree
        .map((node) => {
          const filteredSub = filterTreeByTopicIds(
            node.subItems || [],
            topicIds
          );
          const isTarget = topicIds.includes(node.id);
          if (isTarget || filteredSub.length > 0) {
            return {
              ...node,
              subItems: filteredSub,
            };
          }
          return null;
        })
        .filter((node): node is ListItem => node !== null) ?? []
    );
  }

  const FilteredTree = ({
    fullTree,
    shuffledTopics,
  }: {
    fullTree: ListItem[];
    shuffledTopics: ListItem[];
  }) => {
    const shuffledTopicIds = shuffledTopics.map((topic: ListItem) => topic.id);
    const filteredTree = filterTreeByTopicIds(fullTree, shuffledTopicIds);

    return (
      <div>
        <h2 className="text-sm font-semibold mb-4">Shuffled Topic Hierarchy</h2>
        <TreeNode node={filteredTree} />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col">
      {/* Header */}
      <header className="w-full flex items-center justify-between px-6 py-4 bg-white shadow-md">
        <h1 className=" text-xl font-sans p-1 uppercase inset-ring-amber-50 border-2 rounded-md font-semibold">
          Get Topic
        </h1>
        <Link
          href="/admin"
          className="border border-gray-400 hover:bg-gray-300 hover:border-gray-300 text-black px-3 py-1 rounded-md"
        >
          <p>Admin</p>
        </Link>

      </header>

      {/* Subject Selector */}

      <main className="flex-grow text-center px-4">
        <div className="mt-8 flex flex-row p-6 justify-center">
          <select
            id="subject"
            value={selectedSubjectId}
            onChange={(e) => {
              setSelectedSubjectId(e.target.value);
              setRandomTopics([]);
            }}
            className="border text-sm border-gray-300 min-w-100 rounded-md p-1 py-2 shadow-sm"
          >
            <option className="px-2" value="">
              ---Select Subject---
            </option>
            {/* unselected/default option */}
            {subjects.map((subject) => (
              <option className="p-2" key={subject.id} value={subject.id}>
                {subject.text}
              </option>
            ))}
          </select>

          <button
            onClick={handleShuffle}
            className="ml-4 border align-middle rounded-md px-2 py-2 shadow-sm focus:border-blue-400 border-gray-300 hover:bg-gray-300"
          >
            <Shuffle className="w-4 h-4"> Shuffle </Shuffle>
          </button>
        </div>

        <div className="flex flex-row mt-4 mb-4 justify-center text-[14px]">
          {/* Tree View */}
          {
            <div className="max-w-xl max-h-fit  bg-white shadow p-6 rounded-b-lg">
              {/* <TreeNode node={selectedSubject} shuffledTopics={randomTopics} /> */}
              <FilteredTree
                fullTree={selectedSubject?.subItems ?? subjects}
                shuffledTopics={randomTopics}
              />
            </div>
          }

          {/** show shuffle list here */}
          <div className="ml-4 p-6 bg-white shadow rounded-b-lg">
            <p className="text-sm font-bold">Random Topics</p>
            <ul className="list-decimal list-inside space-y-2 justify-items-start mt-2 ml-1">
              {randomTopics.map((topic) => (
                <li key={topic.id} className="text-gray-800">
                  {topic.text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}

export default User;
