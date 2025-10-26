"use client";

import * as d3 from "d3";
import { useEffect, useState } from "react";
import { GoChevronDown, GoChevronUp, GoTrash } from "react-icons/go";
import { Node } from "./Node";
import { RiAddBoxLine } from "react-icons/ri";

export interface TreeNode {
  name: string;
  children?: TreeNode[];
  _children?: TreeNode[];
  dangerRating: number;
  level: string;
}

interface TreeVisualizerProps {
  data: TreeNode;
  setTreeData: (data: TreeNode) => void;
  highlightedNodes?: TreeNode[];
}

export default function TreeVisualizer({ data, setTreeData, highlightedNodes = [] }: TreeVisualizerProps) {
  const [nodes, setNodes] = useState<d3.HierarchyPointNode<TreeNode>[]>([]);
  const [links, setLinks] = useState<d3.HierarchyPointLink<TreeNode>[]>([]);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const isHighlighted = (node: TreeNode) =>
    highlightedNodes.includes(node);

  useEffect(() => {
  const root = d3.hierarchy<TreeNode>(data, d => d.children ?? undefined);

  // Horizontal tree: x = vertical, y = horizontal
  const treeLayout = d3.tree<TreeNode>().nodeSize([300, 400]);
  treeLayout(root);

  const containerHeight = window.innerHeight;
  const containerWidth = window.innerWidth;

  const allX = root.descendants().map(d => d.x);
  const allY = root.descendants().map(d => d.y);

  const minX = Math.min(...allX);
  const maxX = Math.max(...allX);
  const minY = Math.min(...allY);

  // Center vertically
  let offsetX = (containerHeight - (maxX - minX)) / 2 - minX;
  // If top-most node goes above screen, push tree down
  if (minX + offsetX < 20) offsetX += 20 - (minX + offsetX);

  // Left padding
  let offsetY = 40 - minY;

  setOffset({ x: offsetX, y: offsetY });

  setNodes(root.descendants() as d3.HierarchyPointNode<TreeNode>[]);
  setLinks(root.links() as d3.HierarchyPointLink<TreeNode>[]);
}, [data]);


  const linkGen = d3.linkHorizontal<d3.HierarchyPointLink<TreeNode>, d3.HierarchyPointNode<TreeNode>>()
    .x(d => d.y + offset.y) // horizontal
    .y(d => d.x + offset.x); // vertical

  return (
    <main>
      <div className="relative w-full h-full">
        {/* LINKS */}
        <svg className="relative left-40 top-12 overflow-visible">
          {links.map((link, i) => (
            <path
              key={i}
              d={linkGen(link)!}
              fill="none"
              stroke="black"
              strokeWidth={2}
            />
          ))}
        </svg>

        {/* NODES */}
        {nodes.map((node, i) => (
          <div
            key={i}
            className={`group cursor-pointer transition-all duration-200 hover:ring-2 hover:ring-blue-500 hover:bg-blue-100 rounded-md ${
              isHighlighted(node.data) ? "ring-2 ring-orange-300 bg-orange-100" : ""
            }`}
            style={{ position: "absolute", left: node.y + offset.y, top: node.x + offset.x }}
            onClick={() => {
              node.data.name = prompt("Enter new node name:") || node.data.name;
              setTreeData({ ...data });
            }}
          >
            <div className="relative rounded-full h-6 w-6 border-black border-2 items-center justify-center text-center opacity-0 group-hover:opacity-100 mb-1">
                <p className="text-[12px] text-black">{node.data.dangerRating}</p>
            </div>
            
            <Node name={node.data.name} level={node.data.level} />

            <div className="flex justify-between mt-1">
              {/* Add Child */}
              <button
                className="cursor-pointer text-black font-bold px-1 opacity-0 group-hover:opacity-100"
                onClick={e => {
                  e.stopPropagation();
                  const newChild = prompt("Enter child node name:");
                  if (!newChild) return;
                  if (!node.data.children) node.data.children = [];
                  node.data.dangerRating++;
                  const childLevel = node.data.level === "fortunate" ? "unfortunate" : "fortunate";
                  node.data.children.push({ name: newChild, dangerRating: 0, level: childLevel });
                  setTreeData({ ...data });
                }}
              ><RiAddBoxLine size={17}/></button>

              {/* Collapse/Expand */}
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
              >{node.data.children ? <GoChevronDown size={20}/> : <GoChevronUp size={20}/>}</button>

              {/* Delete Node */}
              <button
                className="cursor-pointer text-black font-bold px-1 opacity-0 group-hover:opacity-100"
                onClick={e => {
                  e.stopPropagation();
                  const parent = node.parent;
                  if (!parent) return;
                  parent.data.children = parent.data.children?.filter(c => c !== node.data);
                  parent.data.dangerRating--;
                  if (parent.data.children?.length === 0) parent.data.children = undefined;
                  setTreeData({ ...data });
                }}
              ><GoTrash size={15}/></button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
