"use client";

import * as d3 from "d3";
import { useEffect, useState } from "react";
import { GoChevronDown, GoChevronUp, GoTrash, GoShield } from "react-icons/go";
import { RiAddBoxLine } from "react-icons/ri";
import { BsDot } from "react-icons/bs";
import IconSelectorButton from "./components/iconButton";
import { Node } from "./Node";
import { getImmediateParent } from "./components/getParent";
import { isFortunate } from "./page";
import { IconType } from "react-icons";

export interface TreeNode {
  name: string;
  children?: TreeNode[];
  _children?: TreeNode[];
  dangerRating: number;
  level: string;
  status: IconType;
}

interface TreeVisualizerProps {
  data: TreeNode;
  setTreeData: (data: TreeNode) => void;
  highlightedNodes?: TreeNode[];
  currentNode?: TreeNode;
}

export default function TreeVisualizer({
  data,
  setTreeData,
  highlightedNodes = [],
  currentNode,
}: TreeVisualizerProps) {
  const [visibleNodes, setVisibleNodes] = useState<d3.HierarchyNode<TreeNode>[]>([]);
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
              <div className="relative flex flex-col cursor-pointer" id={`node-${node.data.name}`} key={i} onClick={() => {
              node.data.name = prompt("Enter new node name:") || node.data.name;
              setTreeData({ ...data });
            }} >
                <div className="node-wrapper" onMouseEnter={e => showParentsAtMouse(e, node.data)} onMouseMove={e => moveParentsAtMouse(e)} onMouseLeave={hideParents}>
                  <Node name={node.data.name} level={node.data.level} />
                </div>
              </div>


              {/* Extra actions (appear on hover) */}
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 ml-3">
                <IconSelectorButton treeNode={node.data} setTreeData={setTreeData} data={data} />
                <button
                className="cursor-pointer text-black font-bold px-1 opacity-0 group-hover:opacity-100"
                onClick={e => {
                  e.stopPropagation();
                  const newChild = prompt("Enter child node name:");
                  if (!newChild) return;
                  if (!node.data.children) node.data.children = [];
                  node.data.dangerRating++;
                  const childLevel =
                    node.data.level === "fortunate"
                      ? "unfortunate"
                      : "fortunate";
                  node.data.children.push({
                    name: newChild,
                    dangerRating: 0,
                    level: childLevel,
                    status: GoShield,
                  });
                  setTreeData({ ...data });
                }}
              >
                <RiAddBoxLine size={17} />
              </button>
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
                {node.data._children?.length===1 &&
                  <p className="text-black">{<BsDot size={30}/>}</p>}
                {node.data._children?.length===2 &&
                  <p className="text-black flex flex-row -space-x-4"><BsDot size={30}/><BsDot size={30}/></p>}
                {node.data._children?.length===3 &&
                  <p className="text-black flex flex-row -space-x-4"><BsDot size={30}/><BsDot size={30}/><BsDot size={30}/></p>}
                {node.data._children && node.data._children.length > 3 &&
                  <p className="text-black">{node.data._children!.length}</p>}
              </div>

              <button
                className="cursor-pointer text-black font-bold px-1 opacity-0 group-hover:opacity-100"
                onClick={e => {
                  e.stopPropagation();
                  const parent = node.parent;
                  if (!parent) return;
                  parent.data.children = parent.data.children?.filter(
                    c => c !== node.data
                  );
                  parent.data.dangerRating--;
                  if (parent.data.children?.length === 0)
                    parent.data.children = undefined;
                  setTreeData({ ...data });
                }}
              >
                <GoTrash size={15} />
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