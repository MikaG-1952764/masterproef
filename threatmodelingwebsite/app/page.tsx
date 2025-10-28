"use client";

import TreeVisualizer from "./TreeVisualizer";
import type { TreeNode } from "./TreeVisualizer";
import { useEffect, useState } from "react";
import SearchBar from "./searchBar";
import { securityTreeData } from "./dummyCase";
import Hamburger from "hamburger-react";
import { tree } from "next/dist/build/templates/app-page";
import { getLastRedNodes, getLastGreenNodes } from "./components/getLastNodes";
import { get } from "http";

export default function Page() {
  const [treeData, setTreeData] = useState<TreeNode | null>(null);
  const [highlightedNodes, setHighlightedNodes] = useState<TreeNode[]>([]);
  const [currentNode, setCurrentNode] = useState<TreeNode | null>(null);
  const [isOpen, setOpen] = useState(false);
  const [redNodes, setRedNodes] = useState<TreeNode[]>([]);
  const [greenNodes, setGreeNodes] = useState<TreeNode[]>([]);
  const [displayRedNodes, setDisplayRedNodes] = useState(false);
  const [displayGreenNodes, setDisplayGreenNodes] = useState(false);
  
  const handleAddTree = () => {
    const rootName = prompt("Enter name for the root node:");
    setTreeData({
      name: rootName || "Start",
      children: [],
      dangerRating: 0,
      level: "fortunate"
    });
  };

  function isFortunate(node: TreeNode) : boolean{
    if(node.level == "fortunate") return true;
    return false;
  }

  useEffect(() => {
    const getRedNodes = getLastRedNodes(treeData!);
    const getGreenNodes = getLastGreenNodes(treeData!);
    setRedNodes(getRedNodes);
    setGreeNodes(getGreenNodes);
  }, [treeData]);

  function ShowNodes({ treeNodes }: { treeNodes: TreeNode[] }){
    return (
      <div className="mt-6 h-[83vh] overflow-y-auto border border-gray-300 rounded">
        {treeNodes.map((element, index) => (
          <button key={index} className={`text-black border-2 border-black p-2 m-1 h-[40px] rounded w-[98%] active:bg-gray-200 ${isFortunate(element) ? "bg-green-200" : "bg-red-200"}`}
                  onClick={() => {setCurrentNode(element); setOpen(false)}}>
            <p>{element.name}</p>
          </button>
        ))}
      </div>
    )
  }

  function computeDangerRating(node: TreeNode): number {
    if (!node.children || node.children.length === 0) return 0;
    node.children.forEach(computeDangerRating);
    node.dangerRating = node.children.length;
    return node.dangerRating;
  }

  const loadDummyData = () => {
    setTreeData(securityTreeData);
    computeDangerRating(securityTreeData);
  }

  const handleReset = () => {
    const userConfirmed = window.confirm("Are you sure you want to reset the tree?");
    if (userConfirmed) setTreeData(null);
  };

  return (
    <main className="p-6 pt-16">
      <h1 className="text-2xl font-bold mb-4 text-center text-black">Fortunately–Unfortunately Tree</h1>

      {/* Fixed search bar */}
      {(treeData)&& (
        <div className="fixed right-40 top-10 w-[300px] z-50">
          <SearchBar
            treeData={treeData}
            setHighlightedNodes={setHighlightedNodes}
            setCurrentNode={setCurrentNode}
          />
        </div>
      )}

      <div
        className={`absolute top-0 right-0 transition-all duration-500 ease-in-out 
          ${isOpen 
            ? "w-[30vw] h-[100vh] border-2 border-black rounded-[20px] bg-gray-200 z-100" 
            : "w-[50px] h-[50px] right-10 top-10 border-transparent"
          }`}
      >
        {isOpen && 
          <div className="flex flex-col">
            <div className="flex flex-row justify-between mt-18 gap-2 ml-2 mr-2">
              <button className="border-2 border-black h-[40px] flex-1 rounded-[20] bg-white text-black font-bold active:bg-gray-400"
                onClick={() => {setDisplayRedNodes(true); setDisplayGreenNodes(false)}}>
                Nodes todo
              </button>
              <button className="border-2 border-black h-[40px] flex-1 rounded-[20] bg-white text-black font-bold active:bg-gray-400"
                onClick={() => {setDisplayRedNodes(false); setDisplayGreenNodes(true)}}>
                Nodes to check
              </button>
              <button className="border-2 border-black h-[40px] flex-1 rounded-[20] bg-white text-black font-bold">
                Finished nodes
              </button>
            </div>
            <div>
              {displayRedNodes &&
              <ShowNodes treeNodes={redNodes} />}
            </div>
            <div>
              {displayGreenNodes &&
              <ShowNodes treeNodes={greenNodes} />}
            </div>
          </div>
        }
        <div className="absolute top-5 right-5">
          <Hamburger color="black" toggled={isOpen} toggle={setOpen} />
        </div>
      </div>

      <div className="h-full w-full">
        {!treeData ? (
          <div className="text-center mt-20">
            <button
              onClick={handleAddTree}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              + Add Tree
            </button>
            <button
              onClick={loadDummyData}
              className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-green-700"
            >
              + Add dummy data
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
                currentNode={currentNode!} // set by SearchBar when Enter is pressed
              />
            </div>
          </>
        )}
      </div>
    </main>
  );
}
