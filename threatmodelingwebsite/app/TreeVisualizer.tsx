"use client";

import * as d3 from "d3";
import { useEffect, useState } from "react";
import { GoChevronDown, GoChevronUp, GoTrash, GoShield, GoInfo } from "react-icons/go";
import { RiAddBoxLine } from "react-icons/ri";
import IconSelectorButton from "./components/iconButton";
import { Node } from "./Node";
import { getImmediateParent, getParentsAbove } from "./components/getParent";
import { isFortunate } from "./page";
import { IconType } from "react-icons";
import { FiTriangle } from "react-icons/fi";

function NodeDangerPopup({ node, data, setTreeData }: { node: TreeNode; data: TreeNode; setTreeData: (data: TreeNode) => void }) {
  const [showDanger, setShowDanger] = useState(false);

  const [impact, setImpact] = useState<number>(1);
  const [likelihood, setLikelihood] = useState<number>(1);

  const [openImpact, setOpenImpact] = useState(false);
  const [openLikelihood, setOpenLikelihood] = useState(false);

  const [dangerRatingHover, setDangerRatingHover] = useState(false);

  return (
    <div className="relative">

      {/* The danger rating button */}
      <button
        className="flex items-center justify-center absolute rounded-full h-10 right-10 -top-6 hover:bg-gray-300 cursor-pointer text-black w-10"
        onClick={() => {
          setShowDanger(!showDanger);
          setOpenImpact(false);
          setOpenLikelihood(false);
        }}
        onMouseEnter={() => setDangerRatingHover(true)}
        onMouseLeave={() => setDangerRatingHover(false)}
      >
        <FiTriangle size={100} color="red"></FiTriangle>
        <span className="absolute inset-0 top-4 text-black font-bold text-sm">
            {node.dangerRating}
        </span>
        {dangerRatingHover &&
          <div className="absolute z-20 -right-26 -top-6 w-30 bg-white border border-black rounded shadow-lg text-black text-[14px]">Danger rating</div>
        }
      </button>

      {/* Popup with dropdowns */}
      {showDanger && (
        <div className="absolute -top-32 -right-6 w-40 bg-white border-2 border-black rounded shadow-lg p-2 z-50 text-black">
          <p className="text-xs font-semibold mb-1">Danger rating: {node.dangerRating}</p>

          {/* Impact dropdown */}
          <div className="relative mb-2">
            <button
              onClick={() => {
                setOpenImpact(!openImpact);
                setOpenLikelihood(false);
              }}
              className="px-2 py-1 border rounded bg-white hover:bg-gray-100 text-sm w-full"
            >
              Impact: {impact ?? "-"}
            </button>

            {openImpact && (
              <div className="absolute mt-1 bg-white border rounded shadow p-1 z-50 w-full">
                {[1,2,3,4,5].map((value) => (
                  <button
                    key={value}
                    onClick={() => {
                      setImpact(value);
                      node.dangerRating = value*likelihood;
                      setOpenImpact(false);
                      setTreeData({ ...data });
                    }}
                    className="block w-full text-left px-2 py-1 hover:bg-gray-200 text-sm"
                  >
                    {value}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Likelihood dropdown */}
          <div className="relative mb-1">
            <button
              onClick={() => {
                setOpenLikelihood(!openLikelihood);
                setOpenImpact(false);
              }}
              className="px-2 py-1 border rounded bg-white hover:bg-gray-100 text-sm w-full"
            >
              Likelihood: {likelihood ?? "-"}
            </button>

            {openLikelihood && (
              <div className="absolute mt-1 bg-white border rounded shadow p-1 z-50 w-full">
                {[1,2,3,4,5].map((value) => (
                  <button
                    key={value}
                    onClick={() => {
                      setLikelihood(value);
                      node.dangerRating = impact*value;
                      setOpenLikelihood(false);
                      // trigger parent update by re-setting the root data reference
                      setTreeData({ ...data });
                    }}
                    className="block w-full text-left px-2 py-1 hover:bg-gray-200 text-sm"
                  >
                    {value}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}


export interface TreeNode {
  name: string;
  children?: TreeNode[];
  _children?: TreeNode[];
  dangerRating?: number;
  level: string;
  status: IconType | null;
  statusColor?: string;
}

interface TreeVisualizerProps {
  data: TreeNode;
  setTreeData: (data: TreeNode) => void;
  highlightedNodes?: TreeNode[];
  currentNode?: TreeNode;
  setOpenParentSummary?: (open: boolean) => void;
  setParentsAbove: (nodes: TreeNode[] | null) => void;
}

export default function TreeVisualizer({
  data,
  setTreeData,
  highlightedNodes = [],
  currentNode,
  setOpenParentSummary,
  setParentsAbove,
}: TreeVisualizerProps) {
  const [visibleNodes, setVisibleNodes] = useState<d3.HierarchyNode<TreeNode>[]>([]);
  const [editingNode, setEditingNode] = useState<TreeNode | null>(null);
  const [infoHover, setInfoHover] = useState<boolean>(false);
  const [hoveredInfoNode, setHoveredInfoNode] = useState<TreeNode | null>(null);
  const [showDanger, setShowDanger] = useState(false);
  const [editValue, setEditValue] = useState("");
  const [tooltip, setTooltip] = useState<{
    visible: boolean;
    x: number;
    y: number;
    parent: TreeNode | null;
  }>({ visible: false, x: 0, y: 0, parent: null });

  const isHighlighted = (node: TreeNode) => highlightedNodes.includes(node);

  useEffect(() => {
    // build d3.hierarchy to get depth information, but we'll walk it manually
    const root = d3.hierarchy<TreeNode>(data, d => d.children ?? undefined);


    // Preorder traversal that only follows `.children` (not `_children`),
    // so collapsed nodes (stored in `_children`) are NOT visited.
    const out: d3.HierarchyNode<TreeNode>[] = [];
    function visit(n: d3.HierarchyNode<TreeNode>) {
      out.push(n);
      if (n.data.children && n.children) {
        // n.children is the d3-generated children array; traverse them
        for (const c of n.children) visit(c);
      }
    }
    visit(root);
    setVisibleNodes(out);
  }, [data]);

  const OFFSET_X = 12;
  const OFFSET_Y = 12;
  const INDENT_PX = 120; // how much each depth indents

  function showParentsAtMouse(e: React.MouseEvent, node: TreeNode) {
    const parent = getImmediateParent(node, data);
    const x = e.clientX + OFFSET_X;
    const y = e.clientY + OFFSET_Y;
    // clamp
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const maxX = vw - 240;
    const maxY = vh - 200;
    setTooltip({
      visible: true,
      x: Math.min(x, maxX),
      y: Math.min(y, maxY),
      parent,
    });
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
    <main className="w-full h-full overflow-auto p-2">
      <div className="flex flex-col gap-1 mt-2">
        {visibleNodes.map((node, i) => (
          <div
            key={i}
            className={`group flex items-center justify-between p-0 rounded-md transition-all duration-200 hover:p-3 hover:pl-4 hover:bg-gray-100
              ${isHighlighted(node.data) ? "ring-4 ring-orange-300 bg-orange-100" : ""} 
              ${currentNode === node.data ? "ring-4 ring-red-600 bg-red-100" : ""}`}
            style={{ marginLeft: `${node.depth * INDENT_PX}px` }}
          >
            <div className="flex flex-col items-center gap-2">              
              {/* Node visual */}
              <div className="relative flex flex-col" id={`node-${node.data.name}`} key={i} >
                <div className="node-wrapper">
                  {node.data.level.toLowerCase() === "unfortunately" && 
                    (
                      <div>
                        {node.data.level.toLowerCase() === "unfortunately" && (
                          <NodeDangerPopup data={data} setTreeData={setTreeData} node={node.data} />
                        )}
                      </div>
                    )
                  }
                  <button className="absolute rounded-full right-2 -top-1 hover:bg-gray-400 cursor-pointer" 
                  onMouseEnter={() =>{ setInfoHover(true); setHoveredInfoNode(node.data)}} onMouseLeave={()=> {setInfoHover(false); setHoveredInfoNode(null)}}
                  onClick={() => {
                    setOpenParentSummary?.(true);
                    setParentsAbove(getParentsAbove(node.data, data));
                  }}>
                    <GoInfo size={16} color="black" pointerEvents={"none"}></GoInfo>
                    {infoHover && node.data===hoveredInfoNode &&
                      <div className="absolute z-20 -right-42 -top-6 w-40 bg-white border border-black rounded shadow-lg text-black text-[14px]">Show branch summary</div>
                    }
                  </button>
                  <p className="text-gray-400 text-[12px] ml-5">{node.data.level}</p>
                  {editingNode === node.data ? (
                  <input
                    className="border p-1 text-sm text-black rounded w-[600px] bg-gray-200"
                    autoFocus
                    value={editValue}
                    onChange={e => setEditValue(e.target.value)}
                    onBlur={() => {
                      editingNode.name = editValue.trim() || editingNode.name;
                      setEditingNode(null);
                      setTreeData({ ...data });
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        editingNode.name = editValue.trim() || editingNode.name;
                        setEditingNode(null);
                        setTreeData({ ...data });
                      }
                      if (e.key === "Escape") {
                        setEditingNode(null);
                      }
                    }}
                  />
                ) : (                
                  <div className="cursor-pointer" onMouseEnter={e => showParentsAtMouse(e, node.data)} onMouseMove={e => moveParentsAtMouse(e)} onMouseLeave={hideParents} onClick={() => 
                    {setEditingNode(node.data);
                    setEditValue(node.data.name);
                    setTreeData({ ...data });}}>
                    <Node name={node.data.name} level={node.data.level} />
                  </div>
                )}
                </div>
              </div>

              <div className="flex gap-2 opacity-0 group-hover:opacity-100 ml-3">
                <IconSelectorButton treeNode={node.data} setTreeData={setTreeData} data={data} />
                <div className="flex flex-row">
                {node.data.children &&
                <button
                  className="cursor-pointer text-black opacity-0 group-hover:opacity-100 font-bold px-1"
                  onClick={e => {
                    e.stopPropagation();
                    if (node.data.children) {
                      node.data._children = node.data.children;
                      node.data.children = undefined;
                    } else if (node.data._children) {
                      node.data.children = node.data._children;
                      node.data._children = undefined;
                    }
                    setTreeData({ ...data });
                  }}
                >
                  {node.data.children ? <GoChevronDown size={20} /> : <GoChevronUp size={20} />}
                </button>}
                {node.data._children &&
                <button
                  className="cursor-pointer text-black opacity-100 font-bold px-1"
                  onClick={e => {
                    e.stopPropagation();
                    if (node.data.children) {
                      node.data._children = node.data.children;
                      node.data.children = undefined;
                    } else if (node.data._children) {
                      node.data.children = node.data._children;
                      node.data._children = undefined;
                    }
                    setTreeData({ ...data });
                  }}
                >
                  {node.data.children ? <GoChevronDown size={20} /> : <GoChevronUp size={20} />}
                </button>}
                {node.data._children &&
                  <p className="text-black">{node.data._children!.length}</p>}
              </div>

              <button
                className="cursor-pointer text-black font-bold px-1 opacity-0 group-hover:opacity-100"
                onClick={e => {
                  e.stopPropagation();
                  const confirmDeletion = window.confirm(`Are you sure you want to delete the node "${node.data.name}"?`)
                  if(!confirmDeletion) return;
                  const parent = node.parent;
                  if (!parent) return;
                  parent.data.children = parent.data.children?.filter(
                    c => c !== node.data
                  );
                  if (parent.data.children?.length === 0)
                    parent.data.children = undefined;
                  setTreeData({ ...data });
                }}
              >
                <GoTrash size={15} />
              </button>
              <button
                className="cursor-pointer text-black font-bold px-1 opacity-0 group-hover:opacity-100"
                onClick={e => {
                  e.stopPropagation();
                  if (!node.data.children) node.data.children = [];
                  const childLevel =
                    node.data.level.toLowerCase() === "fortunately"
                      ? "unfortunately"
                      : "fortunately";
                  node.data.children.push({
                    name: "New node",
                    dangerRating: 1,
                    level: childLevel,
                    status: GoShield,
                  });
                  const newChild = node.data.children[node.data.children.length - 1];
                  setEditingNode(newChild);
                  setEditValue(newChild.name);
                  setTreeData({ ...data });

                }}
              >
                <RiAddBoxLine size={17} />
              </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tooltip */}
      {tooltip.visible && tooltip.parent && (
        <div
          className={`fixed z-50 border p-2 shadow rounded max-w-xs text-sm ${isFortunate(tooltip.parent) ? "bg-green-200" : "bg-red-200"}`}
          style={{ left: tooltip.x, top: tooltip.y, pointerEvents: "none" }}
        >
          <div className="py-0.5 font-semibold text-black">{tooltip.parent ? tooltip.parent.name : "No parent"}</div>
        </div>
      )}
    </main>
  );
}