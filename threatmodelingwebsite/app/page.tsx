"use client";

import TreeVisualizer from "./TreeVisualizer";
import type { TreeNode } from "./TreeVisualizer";
import { useEffect, useState } from "react";
import SearchBar from "./searchBar";
import { Case1Tree } from "./dummyCase1";
import { Case2Tree } from "./dummyCase2";
import { getLastRedNodes, getGreenNodesToCheck, getLastGreenNodesFinished, getRedNodesToCheck } from "./components/getLastNodes";
import { GoShield, GoShieldCheck, GoX } from "react-icons/go";
import { getImmediateParent } from "./components/getParent";
import { CollapseButtons } from "./components/collapseButtons";
import { ImArrowDown2 } from "react-icons/im";
import { FiTriangle } from "react-icons/fi";

export function isFortunate(node: TreeNode): boolean {
  if (node.level.toLowerCase() == "fortunately") return true;
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
  const [displayRedNodesToVerify, setDisplayRedNodesToVerify] = useState(false);
  const [displayGreenNodes, setDisplayGreenNodes] = useState(false);
  const [displayGreenNodesFinished, setDisplayGreenNodesFinished] = useState(false);
  const [activeNodeTab, setActiveNodeTab] = useState<"todo" | "verify" | "check" | "finished">("todo");
  const [openParentSummary, setOpenParentSummary] = useState(false);
  const [parentsAbove, setParentsAbove] = useState<TreeNode[] | null>(null);
  const [redShieldHovered, setRedShieldHovered] = useState(false);
  const [orangeShieldHovered, setOrangeShieldHovered] = useState(false);
  const [orangeCheckShieldHovered, setOrangeCheckShieldHovered] = useState(false);
  const [greenCheckShieldHovered, setGreenCheckShieldHovered] = useState(false);


  const handleAddTree = () => {
    const rootName = prompt("Enter name for the root node:");
    setTreeData({
      name: rootName || "Start",
      children: [],
      dangerRating: 1,
      level: "fortunately",
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

  function expandPathToNode(node: TreeNode, root: TreeNode): boolean {
    const path: TreeNode[] = [];

    // Build path from root to node
    function findPath(current: TreeNode): boolean {
      if (current === node) {
        path.push(current);
        return true;
      }

      const children = current.children ?? [];
      const hiddenChildren = current._children ?? [];

      for (const c of [...children, ...hiddenChildren]) {
        if (findPath(c)) {
          path.push(current);
          return true;
        }
      }

      return false;
    }

    findPath(root);

    // path is now from target node -> root, so reverse it
    path.reverse();

    const alreadyExpanded = path.every((n) => !n._children);

    if (alreadyExpanded) {
      return true; // ✅ all nodes are already expanded
    }

    // Expand any collapsed nodes along the path
    path.forEach((n) => {
      if (n._children) {
        n.children = n._children;
        n._children = undefined;
      }
    });
    return false
  }

  function ShowNodes({ treeNodes, sideBar }: { treeNodes: TreeNode[], sideBar?: string }) {
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
      <div className="mt-6 h-[70vh] overflow-y-auto border border-gray-300 rounded relative">
        {treeNodes.map((element, index) => (
          <div key={index} className="relative">
            <div className="flex flex-row">
              {treeNodes.at(1)?.level.toLowerCase() === "unfortunately" && sideBar === "shields" && (
                <div className="flex items-center justify-center gap-2">
                  <div className="relative flex items-center justify-center w-8 h-8">
                    <FiTriangle color="red" size={30} />
                    <span className="absolute top-2 inset-0 flex items-center justify-center text-black text-[12px] font-bold">
                      {element.dangerRating}
                    </span>
                  </div>

                  {/* Andere box */}
                  <div className="flex items-center justify-center w-10 h-[54px] bg-red-200 border-black border-2 rounded text-black">
                    U
                  </div>
                </div>
              )}
              {treeNodes.at(1)?.level.toLowerCase() === "fortunately" && sideBar === "shields" && (
                <div className="flex justify-center items-center m-1 w-10 h-[54px] bg-green-200 border-black border-2 rounded text-black">F</div>
              )}
              {sideBar === "shields" ? (
                <button
                  className={`text-black text-[14px] border-2 border-black p-2 m-1 h-[54px] rounded w-[98%] active:bg-gray-200 ${isFortunate(element) ? "bg-green-200" : "bg-red-200"
                    }`}
                  onClick={() => {
                    if (expandPathToNode(element, treeData!)) {
                      setCurrentNode(element);
                      setTimeout(() => {
                        const el = document.getElementById(`node-${element.name}`);
                        el?.scrollIntoView({ behavior: "smooth", block: "center" });
                        setOpen(false);
                      }, 50);
                    } else {
                      expandPathToNode(element, treeData!);
                      setTreeData({ ...treeData! });
                      setTimeout(() => {
                        setCurrentNode(element);
                        setOpen(false);
                      }, 0);
                      setTimeout(() => {
                        const el = document.getElementById(`node-${element.name}`);
                        el?.scrollIntoView({ behavior: "smooth", block: "center" });
                        setOpen(false);
                      }, 50);
                      setOpen(false);
                    }
                  }}
                  onMouseEnter={(e) => showParentsAtMouse(e, element)}
                  onMouseMove={(e) => moveParentsAtMouse(e)}
                  onMouseLeave={hideParents}
                >
                  <p>{element.name}</p>
                </button>
              ) : (
                <div>
                  {index != 0 && <ImArrowDown2 className="flex items-center w-full" color="black" size={24} />}
                  <div className="flex flex-row">
                    {element.level.toLowerCase() === "unfortunately" && sideBar === "parents" && (
                      <div className="flex items-center justify-center m-1 w-10 h-[50px] bg-red-200 border-black border-2 rounded text-black text-[14px]">U</div>)
                    }
                    {element.level.toLowerCase() === "fortunately" && sideBar === "parents" && (
                      <div className="flex items-center justify-center m-1 w-10 h-[50px] bg-green-200 border-black border-2 rounded text-black text-[14px]">F</div>)
                    }
                    <button
                      className={`text-black text-[14px] border-2 border-black m-1 h-[50px] w-[25vw] rounded active:bg-gray-200 cursor-pointer ${isFortunate(element) ? "bg-green-200" : "bg-red-200"
                        }`}
                      onClick={() => {
                        if (expandPathToNode(element, treeData!)) {
                          setCurrentNode(element);
                          setTimeout(() => {
                            const el = document.getElementById(`node-${element.name}`);
                            el?.scrollIntoView({ behavior: "smooth", block: "center" });
                          }, 50);
                        } else {
                          expandPathToNode(element, treeData!);
                          setTreeData({ ...treeData! });
                          setTimeout(() => {
                            setCurrentNode(element);
                            setOpen(false);
                          }, 0);
                          setTimeout(() => {
                            const el = document.getElementById(`node-${element.name}`);
                            el?.scrollIntoView({ behavior: "smooth", block: "center" });
                          }, 50);
                          setOpen(false);
                        }
                      }}
                    >
                      <p>{element.name}</p>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Tooltip that follows the mouse */}
        {tooltip.visible && tooltip.parent && (
          <div
            className={`fixed z-50 border p-2 shadow rounded max-w-xs text-sm ${isFortunate(tooltip.parent) ? "bg-green-200" : "bg-red-200"}`}
            style={{
              left: tooltip.x,
              top: tooltip.y,
              pointerEvents: "none"
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

  const loadDummyData1 = () => {
    setTreeData(Case1Tree);
  }

  const loadDummyData2 = () => {
    setTreeData(Case2Tree);
  }

  const handleReset = () => {
    const userConfirmed = window.confirm("Are you sure you want to reset the tree?");
    if (userConfirmed) setTreeData(null);
  };

  return (
    <main className="p-6 pt-16">
      <h1 className="text-2xl font-bold mb-4 text-center text-black">Fortunately–Unfortunately Tree</h1>

      {/* Fixed search bar */}
      {(treeData) && (
        <div className="fixed right-40 top-10 w-[300px] z-50">
          <CollapseButtons treeData={treeData!} setTreeData={setTreeData!} />
          <SearchBar
            treeData={treeData}
            setHighlightedNodes={setHighlightedNodes}
            setCurrentNode={setCurrentNode}
          />
        </div>
      )}

      <div>
        {openParentSummary && (
          <div className="absolute flex flex-col w-[32vw] h-[100vh] top-0 left-0 z-100 bg-gray-300 border-2 border-black rounded-[20px] p-4">
            <div className="flex flex-row">
              <h2 className="text-black text-xl font-bold flex-1 mt-5 ml-4">Parents above current node</h2>
              <button className="flex justify-end mt-2" onClick={() => { setOpenParentSummary(false) }}><GoX size={50} color="black"></GoX></button>
            </div>
            {(!parentsAbove || parentsAbove.length === 0) ? (
              <div className="text-red-400 text-[20px] mt-4 ml-4">No parents available.</div>
            ) : (
              <ShowNodes treeNodes={parentsAbove} sideBar="parents" />
            )}
          </div>
        )}
      </div>

      <div
        className={`absolute top-0 right-0 transition-all duration-500 ease-in-out 
          ${isOpen
            ? "w-[50vw] h-[100vh] border-2 border-black rounded-[20px] bg-gray-200 z-100"
            : "w-[50px] h-[50px] right-10 top-10 border-transparent"
          }`}
      >
        {isOpen &&
          <div className="flex flex-col">
            <button className="flex justify-end p-2 mt-2" onClick={() => { setOpen(!isOpen) }}><GoX size={50} color="black"></GoX></button>
            <div className="flex flex-row justify-between gap-2 ml-2 mr-2">
              <button className={`border-2 border-black h-[40px] flex-1 rounded-[20] font-bold ${activeNodeTab === 'todo' ? 'bg-gray-300 text-black' : 'bg-white text-black'} active:bg-gray-400 `}
                onClick={() => { setDisplayRedNodes(true); setDisplayGreenNodes(false); setDisplayGreenNodesFinished(false); setDisplayRedNodesToVerify(false); setActiveNodeTab("todo") }}>
                <div className="text-[15px]">
                  Weaknesses
                  <GoShield className="inline ml-2" color="red" />
                </div>
              </button>
              <button className={`border-2 border-black h-[40px] flex-1 rounded-[20] font-bold ${activeNodeTab === 'verify' ? 'bg-gray-300 text-black' : 'bg-white text-black'} active:bg-gray-400 `}
                onClick={() => { setDisplayRedNodes(false); setDisplayGreenNodes(false); setDisplayGreenNodesFinished(false); setDisplayRedNodesToVerify(true); setActiveNodeTab("verify") }}>
                <div className="text-[15px]">
                  Weaknesses Under Review
                  <GoShield className="inline ml-2" color="orange" />
                </div>
              </button>
            </div>
            <div className="flex flex-row justify-between mt-2 gap-2 ml-2 mr-2">
              <button className={`border-2 border-black h-[40px] flex-1 rounded-[20] font-bold ${activeNodeTab === 'check' ? 'bg-gray-300 text-black' : 'bg-white text-black'} active:bg-gray-400 `}
                onClick={() => { setDisplayRedNodes(false); setDisplayGreenNodes(true); setDisplayGreenNodesFinished(false); setDisplayRedNodesToVerify(false); setActiveNodeTab("check") }}>
                <div className="text-[15px]">
                  Assumptions Under Review
                  <GoShieldCheck className="inline ml-2" color="orange" />
                </div>
              </button>
              <button className={`border-2 border-black h-[40px] flex-1 rounded-[20] font-bold ${activeNodeTab === 'finished' ? 'bg-gray-300 text-black' : 'bg-white text-black'} active:bg-gray-400 `}
                onClick={() => { setDisplayRedNodes(false); setDisplayGreenNodes(false); setDisplayGreenNodesFinished(true); setDisplayRedNodesToVerify(false); setActiveNodeTab("finished") }}>
                <div className="text-[15px]">
                  Verified assumptions
                  <GoShieldCheck className="inline ml-2" color="green" />
                </div>
              </button>
            </div>
            <div className="flex flex-row w-full">
              {displayRedNodes && (
                <div className="flex items-center text-black font-bold mb-2 ml-2">
                  <span>Danger Rating</span>
                  <FiTriangle className="ml-2" color="red" size={20} />
                  <span>:</span>
                  <ImArrowDown2 className="ml-2" color="black" size={20} />
                </div>
              )}
              {displayRedNodesToVerify && (
                <div className="flex items-center text-black font-bold mb-2 ml-2">
                  <span>Danger Rating</span>
                  <FiTriangle className="ml-2" color="red" size={20} />
                  <span>:</span>
                  <ImArrowDown2 className="ml-2" color="black" size={20} />
                </div>
              )}
              <div className="flex-1">
                {displayRedNodes && <ShowNodes treeNodes={redNodes} sideBar="shields" />}
                {displayRedNodesToVerify && <ShowNodes treeNodes={redNodesToVerify} sideBar="shields" />}
                {displayGreenNodes && <ShowNodes treeNodes={greenNodes} sideBar="shields" />}
                {displayGreenNodesFinished && <ShowNodes treeNodes={greenNodesFinished} sideBar="shields" />}
              </div>
            </div>
          </div>
        }
        <div className="absolute top-5 right-0 flex flex-col items-center">
          {!isOpen &&
            <div>
              <button className={`rounded-2xl h-10 w-16 border-2 border-black items-center flex justify-center bg-gray-200 active:bg-gray-400 hover:bg-gray-300`}
                onClick={() => { setRedShieldHovered(false); setOpen(!isOpen); setDisplayRedNodes(true); setDisplayGreenNodes(false); setDisplayGreenNodesFinished(false); setDisplayRedNodesToVerify(false); setActiveNodeTab("todo") }}
                onMouseEnter={() => setRedShieldHovered(true)}
                onMouseLeave={() => setRedShieldHovered(false)}>
                <GoShield color="red" size={24} />
                <p className="text-black">[{redNodes.length}]</p>
                {redShieldHovered && <div className="absolute z-100 right-16 w-40 bg-white border border-black rounded shadow-lg text-black text-[14px]">Weaknesses</div>}
              </button>
              <button className="rounded-2xl h-10 w-16 border-2 border-black items-center flex justify-center bg-gray-200 active:bg-gray-400 mt-2 mb-2 hover:bg-gray-300"
                onClick={() => { setOrangeShieldHovered(false); setOpen(!isOpen); setDisplayRedNodes(false); setDisplayGreenNodes(false); setDisplayGreenNodesFinished(false); setDisplayRedNodesToVerify(true); setActiveNodeTab("verify") }}
                onMouseEnter={() => setOrangeShieldHovered(true)}
                onMouseLeave={() => setOrangeShieldHovered(false)}>
                <GoShield color="orange" size={24} />
                <p className="text-black">[{redNodesToVerify.length}]</p>
                {orangeShieldHovered && <div className="absolute z-100 right-16 w-40 bg-white border border-black rounded shadow-lg text-black text-[14px]">Weaknesses Under Review</div>}
              </button>
              <button className="rounded-2xl h-10 w-16 border-2 border-black items-center flex justify-center bg-gray-200 active:bg-gray-400 mb-2 hover:bg-gray-300"
                onClick={() => { setOrangeCheckShieldHovered(false); setOpen(!isOpen); setDisplayRedNodes(false); setDisplayGreenNodes(true); setDisplayGreenNodesFinished(false); setDisplayRedNodesToVerify(false); setActiveNodeTab("check") }}
                onMouseEnter={() => setOrangeCheckShieldHovered(true)}
                onMouseLeave={() => setOrangeCheckShieldHovered(false)}>
                <GoShieldCheck color="orange" size={24} />
                <p className="text-black">[{greenNodes.length}]</p>
                {orangeCheckShieldHovered && <div className="absolute z-100 right-16 w-40 bg-white border border-black rounded shadow-lg text-black text-[14px]">Assumptions Under Review</div>}
              </button>
              <button className="rounded-2xl h-10 w-16 border-2 border-black items-center flex justify-center bg-gray-200 active:bg-gray-400 hover:bg-gray-300"
                onClick={() => { setGreenCheckShieldHovered(false); setOpen(!isOpen); setDisplayRedNodes(false); setDisplayGreenNodes(false); setDisplayGreenNodesFinished(true); setDisplayRedNodesToVerify(false); setActiveNodeTab("finished") }}
                onMouseEnter={() => setGreenCheckShieldHovered(true)}
                onMouseLeave={() => setGreenCheckShieldHovered(false)}>
                <GoShieldCheck color="green" size={24} />
                <p className="text-black">[{greenNodesFinished.length}]</p>
                {greenCheckShieldHovered && <div className="absolute z-100 right-16 w-40 bg-white border border-black rounded shadow-lg text-black text-[14px]">Verified Assumptions</div>}
              </button>
            </div>}
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
              onClick={loadDummyData1}
              className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-green-700"
            >
              + Add data case 1
            </button>
            <button
              onClick={loadDummyData2}
              className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-green-700"
            >
              + Add data case 2
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

            <div className="overflow-auto w-[95vw] h-[80vh] pr-[60px]">
              <TreeVisualizer
                data={treeData}
                setTreeData={setTreeData}
                highlightedNodes={highlightedNodes}
                currentNode={currentNode!}
                setOpenParentSummary={setOpenParentSummary}
                setParentsAbove={setParentsAbove}
              />
            </div>
          </>
        )}
      </div>
    </main>
  );
}
