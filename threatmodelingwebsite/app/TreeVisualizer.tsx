"use client";

import * as d3 from "d3";
import { useEffect, useState, useRef } from "react";
import { GoChevronDown, GoChevronUp, GoTrash, GoShield } from "react-icons/go";
import { Node } from "./Node";
import { RiAddBoxLine } from "react-icons/ri";
import IconSelectorButton from "./components/iconButton";
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
  const [nodes, setNodes] = useState<d3.HierarchyPointNode<TreeNode>[]>([]);
  const [links, setLinks] = useState<d3.HierarchyPointLink<TreeNode>[]>([]);
  const [offset, setOffset] = useState({ x: 80, y: 60 }); // adjust spacing
  const nodeRefs = useRef<Map<TreeNode, HTMLDivElement>>(new Map());

  const isHighlighted = (node: TreeNode) => highlightedNodes.includes(node);

  // 🧠 D3 Indented Tree Layout
  useEffect(() => {
    const root = d3.hierarchy<TreeNode>(data, d => d.children ?? undefined);

    // Flatten the hierarchy into a list
    const nodesArray: d3.HierarchyNode<TreeNode>[] = [];
    root.eachBefore(d => nodesArray.push(d));

    // Layout: vertical stacking + horizontal indentation
    const nodeHeight = 100; // vertical gap between rows
    const indent = 220; // horizontal indent per depth

    const positionedNodes = nodesArray.map((node, i) => ({
      ...node,
      x: i * nodeHeight,
      y: node.depth * indent,
    }));

    setNodes(positionedNodes as d3.HierarchyPointNode<TreeNode>[]);
    setLinks(root.links() as d3.HierarchyPointLink<TreeNode>[]);
  }, [data]);


const linkGen = d3
  .linkHorizontal<d3.HierarchyPointLink<TreeNode>, d3.HierarchyPointNode<TreeNode>>()
  .x(d => d.x + offset.y) // swapped!
  .y(d => d.y + offset.x);


  // Auto-scroll to current highlighted node
  useEffect(() => {
    if (currentNode && nodeRefs.current.has(currentNode)) {
      nodeRefs.current.get(currentNode)?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [currentNode]);

  return (
    <main className="w-full h-full relative overflow-auto">
      {/* LINKS */}
    <svg className="absolute top-0 left-0 w-full h-full overflow-visible pointer-events-none">
      {links.map((link, i) => {
        const parent = nodes.find(n => n.data === link.source.data);
        const child = nodes.find(n => n.data === link.target.data);
        if (!parent || !child) return null;

        // Coordinates — top-down layout
        const x1 = parent.x + offset.y + 40;  // vertical
        const y1 = parent.y + offset.x + 180; // horizontal (to right edge of parent)
        const x2 = child.x + offset.y + 40;
        const y2 = child.y + offset.x + 20;   // horizontal (to left edge of child)

        // Smooth horizontal curve
        const path = `
          M${y1},${x1}
          V${x2}
          H${y2}
        `;


        return (
          <path
            key={i}
            d={path}
            fill="none"
            stroke="black"
            strokeWidth={1.5}
          />
        );
      })}
    </svg>

      {/* NODES */}
      {nodes.map((node, i) => (
        <div
          key={i}
          ref={el => {
            if (el) nodeRefs.current.set(node.data, el);
          }}
          className={`group cursor-pointer transition-all duration-200 hover:ring-2 hover:ring-blue-500 hover:bg-blue-100 rounded-md ${
            isHighlighted(node.data)
              ? "ring-2 ring-orange-300 bg-orange-100"
              : ""
          } ${currentNode === node.data ? "ring-4 ring-red-400" : ""}`}
          style={{
            position: "absolute",
            left: node.y + offset.x,
            top: node.x + offset.y,
          }}
          onClick={() => {
            node.data.name = prompt("Enter new node name:") || node.data.name;
            setTreeData({ ...data });
          }}
        >
          <div className="flex flex-row justify-between">
            <div className="rounded-full h-6 w-6 border-black border-2 items-center justify-center text-center opacity-0 group-hover:opacity-100">
              <p className="text-[12px] text-black">{node.data.dangerRating}</p>
            </div>

            <div className="opacity-0 group-hover:opacity-100">
              <IconSelectorButton
                treeNode={node.data}
                setTreeData={setTreeData}
                data={data}
              />
            </div>
          </div>

          <Node name={node.data.name} level={node.data.level} />

          <div className="flex justify-between mt-1">
            {/* ➕ Add Child */}
            <button
              className="cursor-pointer text-black font-bold px-1 opacity-0 group-hover:opacity-100"
              onClick={e => {
                e.stopPropagation();
                const newChild = prompt("Enter child node name:");
                if (!newChild) return;
                if (!node.data.children) node.data.children = [];
                node.data.dangerRating++;
                const childLevel =
                  node.data.level === "fortunate" ? "unfortunate" : "fortunate";
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

            {/* ⬇️ Expand/Collapse */}
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
              {node.data.children ? (
                <GoChevronDown size={20} />
              ) : (
                <GoChevronUp size={20} />
              )}
            </button>

            {/* 🗑️ Delete */}
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
      ))}
    </main>
  );
}
