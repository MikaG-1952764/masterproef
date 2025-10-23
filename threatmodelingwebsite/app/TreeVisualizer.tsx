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
    const treeLayout = d3.tree<TreeNode>().nodeSize([160, 140]);
    treeLayout(root);

    root.descendants().forEach(d => {
      const tmp = d.x;
      d.x = d.y;
      d.y = tmp;
    });

    const containerWidth = window.innerWidth;
    setOffset({ x: containerWidth / 2 - root.y!, y: 50 - root.x! });

    setNodes(root.descendants() as d3.HierarchyPointNode<TreeNode>[]);
    setLinks(root.links() as d3.HierarchyPointLink<TreeNode>[]);
  }, [data]);

  return (
    <div className="relative w-full h-[500px] border">
      {/* LINKS */}
      {links.map((link, i) => (
        <svg key={i} className="absolute left-0 top-0 w-full h-full pointer-events-none">
          <path
            d={`
              M ${link.source.y + offset.x} ${link.source.x + offset.y}
              V ${(link.source.x + link.target.x) / 2 + offset.y}
              H ${link.target.y + offset.x}
              V ${link.target.x + offset.y}
            `}
            fill="none"
            stroke="black"
            strokeWidth={2}
          />
        </svg>
      ))}

      {/* NODES */}
      {nodes.map((node, i) => (
        <div
          key={i}
          className={`group cursor-pointer transition-all duration-200 hover:ring-2 hover:ring-blue-500 hover:bg-blue-100 rounded-md ${
            isHighlighted(node.data) ? "ring-2 ring-orange-300 bg-orange-100" : ""
          }`}
          style={{ position: "absolute", left: node.y + offset.x, top: node.x + offset.y, transform: "translate(-50%, -50%)" }}
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
                if (parent.data.children?.length === 0) parent.data.children = undefined;
                setTreeData({ ...data });
              }}
            ><GoTrash size={15}/></button>
          </div>
        </div>
      ))}
    </div>
  );
}
