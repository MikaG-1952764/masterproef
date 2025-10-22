"use client";

import TreeVisualizer from "./TreeVisualizer";
import type { TreeNode } from "./TreeVisualizer";
import { useState } from "react";
import SearchBar from "./searchBar";

export default function Page() {
  // 🪴 Start with no tree
  const [treeData, setTreeData] = useState<TreeNode | null>(null);

  const handleAddTree = () => {
    // 🌱 Create a new root node
    const rootName = prompt("Enter name for the root node:");
    if (!rootName) {
      setTreeData({
        name: "Start",
        children: [],
      });
    } else {
      setTreeData({
        name: rootName,
        children: [],
      });
    }

  };

  const handleReset = () => {
    const userConfirmed = window.confirm("Are you sure you want to reset the tree?")

    if (userConfirmed) {
      setTreeData(null);
    } else {
      console.log("Reset cancelled.")
    }
  };

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-center text-black">Fortunately–Unfortunately Tree</h1>

      <div className="fixed right-20 w-[300px]">

      </div>
      <div>
        {!treeData ? (
          <div className="text-center mt-20">
            <button
            onClick={handleAddTree}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              + Add Tree
            </button>
          </div>
        ) : (
          <>
            {/* Optional reset button */}
            <button
              onClick={handleReset}
              className="mb-4 px-3 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
            >
              Reset Tree
            </button>

            {/* Show the tree visualizer */}
            <TreeVisualizer data={treeData} setTreeData={setTreeData} />
          </>
        )}
      </div>
    </main>
  );
}