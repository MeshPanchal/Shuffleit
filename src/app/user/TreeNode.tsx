"use client";

import { useState } from "react";
import { ListItem } from "../types";

interface TreeNodeProps {
  node: ListItem[];
}

export const TreeNode: React.FC<TreeNodeProps> = ({ node=[]}:{node:ListItem[]}) => {
  return (
    <ul className="list-none pl-4">
      {node.map((item) => (
        <TreeItem key={item.id} item={item} />
      ))}
    </ul>
  );
};

const TreeItem: React.FC<{ item: ListItem }> = ({ item }) => {
  const [expanded, setExpanded] = useState(true);
  const hasChildren = item.subItems && item.subItems.length > 0;

  return (
    <li className="mb-2">
      <div
        className="flex items-center cursor-pointer select-none group"
        onClick={() => hasChildren && setExpanded(!expanded)}
      >
        {hasChildren ? (
          <span className="mr-1 text-gray-500 group-hover:text-blue-500 transition">
            {expanded ? "▼" : "▶"}
          </span>
        ) : (
          <span className="mr-4" /> // spacing for alignment
        )}
        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-sm">
          {item.text}
        </span>
      </div>

      {hasChildren && expanded && (
        <div className="pl-4 border-l border-gray-300 ml-2 mt-1">
          <TreeNode node={item.subItems} />
        </div>
      )}
    </li>
  );
};
