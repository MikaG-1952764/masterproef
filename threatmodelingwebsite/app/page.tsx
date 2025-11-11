"use client";

import TreeVisualizer from "./TreeVisualizer";
import type { TreeNode } from "./TreeVisualizer";
import { useEffect, useState } from "react";
import SearchBar from "./searchBar";
import { securityTreeData } from "./dummyCase";
import Hamburger from "hamburger-react";
import { getLastRedNodes, getGreenNodesToCheck, getLastGreenNodesFinished, getRedNodesToCheck } from "./components/getLastNodes";
import { GoShield, GoShieldCheck } from "react-icons/go";
import { getImmediateParent } from "./components/getParent";

export function isFortunate(node: TreeNode) : boolean{
    if(node.level == "fortunate") return true;
    return false;
  }

export default function Page() {
  const [treeData, setTreeData] = useState<TreeNode | null>(null);
  const [highlightedNodes, setHighlightedNodes] = useState<TreeNode[]>([]);
  const [currentNode, setCurrentNode] = useState<TreeNode | null>(null);
  const [isOpen, setOpen] = useState(false);
  const [redNodes, setRedNodes] = useState<TreeNode[]>([]);
  const [redNodesToVerify, setRedNodesToVerify] = useState<TreeNode[]>([]);
  const [greenNodes, setGreenNodes] = useState<TreeNode[]>([]);
  const [greenNodesFinished, setGreenNodesFinished] = useState<TreeNode[]>([]);
  const [displayRedNodes, setDisplayRedNodes] = useState(true);
  const [displayRedNodesToVerify, setDisplayRedNodesToVerify] = useState(true);
  const [displayGreenNodes, setDisplayGreenNodes] = useState(false);
  const [displayGreenNodesFinished, setDisplayGreenNodesFinished] = useState(false);
  const [activeNodeTab, setActiveNodeTab] = useState<"todo" | "verify" | "check" | "finished">("todo");
  
  const handleAddTree = () => {
    const rootName = prompt("Enter name for the root node:");
    setTreeData({
      name: rootName || "Start",
      children: [],
      dangerRating: 0,
      level: "fortunate",
      status: GoShield,
    });
  };

  useEffect(() => {
    const getRedNodes = getLastRedNodes(treeData!);
    const getRedNodesToVerify = getRedNodesToCheck(treeData!);
    const getGreenNodesToCheckVar = getGreenNodesToCheck(treeData!);
    const getGreenNodesFinished = getLastGreenNodesFinished(treeData!);
    setRedNodes(getRedNodes);
    setRedNodesToVerify(getRedNodesToVerify);
    setGreenNodes(getGreenNodesToCheckVar);
    setGreenNodesFinished(getGreenNodesFinished);
  }, [treeData]);

  function ShowNodes({ treeNodes }: { treeNodes: TreeNode[] }) {
    const [tooltip, setTooltip] = useState<{
      visible: boolean;
      x: number;
      y: number;
      parent: TreeNode | null;
    }>({ visible: false, x: 0, y: 0, parent: null });

    // offset so tooltip doesn't hide the cursor
    const OFFSET_X = 12;
    const OFFSET_Y = 12;

    function showParentsAtMouse(e: React.MouseEvent, node: TreeNode) {
      if (!treeData) return;
      const parent = getImmediateParent(node, treeData!);
      // use client coords and small offset
      const x = (e as React.MouseEvent).clientX + OFFSET_X;
      const y = (e as React.MouseEvent).clientY + OFFSET_Y;

      // clamp to viewport (optional but handy)
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const maxX = vw - 240; // assume tooltip width ~240px
      const maxY = vh - 200; // assume tooltip height ~200px
      const clampedX = Math.min(x, maxX);
      const clampedY = Math.min(y, maxY);

      setTooltip({ visible: true, x: clampedX, y: clampedY, parent });
    }

    function moveParentsAtMouse(e: React.MouseEvent) {
      const x = e.clientX + OFFSET_X;
      const y = e.clientY + OFFSET_Y;
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const maxX = vw - 140;
      const maxY = vh - 120;
      setTooltip(t => ({ ...t, x: Math.min(x, maxX), y: Math.min(y, maxY) }));
    }

    function hideParents() {
      setTooltip({ visible: false, x: 0, y: 0, parent: null });
    }

    return (
      <div className="mt-6 h-[79vh] overflow-y-auto border border-gray-300 rounded relative">
        {treeNodes.map((element, index) => (
          <div key={index} className="relative">
            <button
              className={`text-black border-2 border-black p-2 m-1 h-[40px] rounded w-[98%] active:bg-gray-200 ${
                isFortunate(element) ? "bg-green-200" : "bg-red-200"
              }`}
              onClick={() => {
                setCurrentNode(element);
                setOpen(false);
              }}
              onMouseEnter={(e) => showParentsAtMouse(e, element)}
              onMouseMove={(e) => moveParentsAtMouse(e)}
              onMouseLeave={hideParents}
            >
              <p>{element.name}</p>
            </button>
          </div>
        ))}

        {/* Tooltip that follows the mouse */}
        {tooltip.visible && tooltip.parent &&(
          <div
            className={`fixed z-50 border p-2 shadow rounded max-w-xs text-sm ${isFortunate(tooltip.parent) ? "bg-green-200" : "bg-red-200"}`}
            style={{
              left: tooltip.x,
              top: tooltip.y,
              pointerEvents: "none" // so it doesn't interfere with mouse events
            }}
          >
            {tooltip.parent ? (
              <div className={`py-0.5 font-semibold text-black `}>{tooltip.parent.name}</div>
            ) : (
              <div className="text-black">No parent</div>
            )}
          </div>
        )}
      </div>
    );
  }


  function computeDangerRating(node: TreeNode) {
    if (!node.children || node.children.length === 0) return 0;
    node.children.forEach(computeDangerRating);
    node.dangerRating = node.children.length;
  }

  function addIconStatus(node: TreeNode) {
    node.status = GoShield;
    if (node.children) node.children.forEach(addIconStatus);
    if (node._children) node._children.forEach(addIconStatus);
  }

  const loadDummyData = () => {
    setTreeData(securityTreeData);
    computeDangerRating(securityTreeData);
    addIconStatus(securityTreeData);
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
              <button className={`border-2 border-black h-[40px] flex-1 rounded-[20] font-bold ${activeNodeTab==='todo' ? 'bg-gray-300 text-black' : 'bg-white text-black'} active:bg-gray-400 `}
                onClick={() => {setDisplayRedNodes(true); setDisplayGreenNodes(false); setDisplayGreenNodesFinished(false); setDisplayRedNodesToVerify(false); setActiveNodeTab("todo")}}>
                <div className="text-[15px]">
                  Weaknesses
                  <GoShield className="inline ml-2" color="red"/>
                </div>
              </button>
              <button className={`border-2 border-black h-[40px] flex-1 rounded-[20] font-bold ${activeNodeTab==='verify' ? 'bg-gray-300 text-black' : 'bg-white text-black'} active:bg-gray-400 `}
                onClick={() => {setDisplayRedNodes(false); setDisplayGreenNodes(false); setDisplayGreenNodesFinished(false); setDisplayRedNodesToVerify(true); setActiveNodeTab("verify")}}>
                <div className="text-[15px]">
                  Further investigation
                  <GoShield className="inline ml-2" color="orange"/>
                </div>
              </button>
            </div>
            <div className="flex flex-row justify-between mt-2 gap-2 ml-2 mr-2">
              <button className={`border-2 border-black h-[40px] flex-1 rounded-[20] font-bold ${activeNodeTab==='check' ? 'bg-gray-300 text-black' : 'bg-white text-black'} active:bg-gray-400 `}
                onClick={() => {setDisplayRedNodes(false); setDisplayGreenNodes(true); setDisplayGreenNodesFinished(false); setDisplayRedNodesToVerify(false); setActiveNodeTab("check")}}>
                <div className="text-[15px]">
                  Assumptions to verify
                  <GoShield className="inline ml-2" color="orange"/>
                </div>
              </button>
              <button className={`border-2 border-black h-[40px] flex-1 rounded-[20] font-bold ${activeNodeTab==='finished' ? 'bg-gray-300 text-black' : 'bg-white text-black'} active:bg-gray-400 `}
                      onClick={() => {setDisplayRedNodes(false); setDisplayGreenNodes(false); setDisplayGreenNodesFinished(true); setDisplayRedNodesToVerify(false); setActiveNodeTab("finished")}}>
                <div className="text-[15px]">
                  Verified assumptions
                  <GoShieldCheck className="inline ml-2" color="green"/>
                </div>
              </button>
            </div>
            <div className="group">
              {displayRedNodes &&
              <ShowNodes treeNodes={redNodes} />}
            </div>
            <div>
              {displayRedNodesToVerify &&
              <ShowNodes treeNodes={redNodesToVerify} />}
            </div>
            <div>
              {displayGreenNodes &&
              <ShowNodes treeNodes={greenNodes} />}
            </div>
            <div>
              {displayGreenNodesFinished &&
              <ShowNodes treeNodes={greenNodesFinished} />}
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
