"use client";

import TreeVisualizer from "./TreeVisualizer";
import type { TreeNode } from "./TreeVisualizer";
import { useState } from "react";

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
      <h1 className="text-2xl font-bold mb-4">Fortunately–Unfortunately Tree</h1>

      {/* If there's no tree, show the add button */}
      {!treeData ? (
        <button
          onClick={handleAddTree}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          + Add Tree
        </button>
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
    </main>
  );
}