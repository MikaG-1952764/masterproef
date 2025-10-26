"use client";

import TreeVisualizer from "./TreeVisualizer";
import type { TreeNode } from "./TreeVisualizer";
import { useState } from "react";
import SearchBar from "./searchBar";

export default function Page() {
  const [treeData, setTreeData] = useState<TreeNode | null>(null);
  const [highlightedNodes, setHighlightedNodes] = useState<TreeNode[]>([]);

  const handleAddTree = () => {
    const rootName = prompt("Enter name for the root node:");
    setTreeData({
      name: rootName || "Start",
      children: [],
      dangerRating: 0,
      level: "fortunate"
    });
  };

  const handleReset = () => {
    const userConfirmed = window.confirm("Are you sure you want to reset the tree?");
    if (userConfirmed) setTreeData(null);
  };

  return (
    <main className="p-6 pt-16">
      <h1 className="text-2xl font-bold mb-4 text-center text-black">Fortunately–Unfortunately Tree</h1>

      {/* Fixed search bar */}
      {treeData && (
        <div className="fixed right-40 top-10 w-[300px] z-50">
          <SearchBar treeData={treeData} setHighlightedNodes={setHighlightedNodes} />
        </div>
      )}

      <div className="h-full w-full">
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
            <button
              onClick={handleReset}
              className="mb-4 px-3 py-2 top-10 left-30 bg-gray-300 rounded hover:bg-gray-400 transition fixed z-50"
            >
              Reset Tree
            </button>
            
            <div className="overflow-auto w-[95vw] h-[90vh] pr-[60px]">
              <TreeVisualizer
              data={treeData}
              setTreeData={setTreeData}
              highlightedNodes={highlightedNodes}
            />
            </div>
          </>
        )}
      </div>
    </main>
  );
}
