"use client";

import * as d3 from "d3";
import { useEffect, useState } from "react";
import { Node } from "./Node";

export interface TreeNode {
  name: string;
  children?: TreeNode[];
  _children?: TreeNode[];
}

interface TreeVisualizerProps {
  data: TreeNode;
  setTreeData: (data: TreeNode) => void;
}

export default function TreeVisualizer({ data, setTreeData }: TreeVisualizerProps) {
  const [nodes, setNodes] = useState<d3.HierarchyPointNode<TreeNode>[]>([]);
  const [links, setLinks] = useState<d3.HierarchyPointLink<TreeNode>[]>([]);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  function toggleNode(node: TreeNode) {
    if (node.children) {
        // Collapse: move children to _children
        node._children = node.children;
        node.children = undefined;
    } else if (node._children) {
        // Expand: move _children back to children
        node.children = node._children;
        node._children = undefined;
    }
    }

  useEffect(() => {
    // 1. Compute tree layout
    const root = d3.hierarchy<TreeNode>(data, d => d.children ?? d._children);
    const treeLayout = d3.tree<TreeNode>().nodeSize([140, 140]);
    treeLayout(root);

    // Swap x and y for vertical top-down layout
    root.descendants().forEach(d => {
      const tmp = d.x;
      d.x = d.y;
      d.y = tmp;
    });
    const containerWidth = window.innerWidth;
    const containerHeight = 500;

    const rootNode = root; // root after layout
    const translateX = containerWidth / 2 - rootNode.y!; // horizontal center
    const translateY = 50 - rootNode.x!; // top margin, 50px from top

    setOffset({ x: translateX, y: translateY });

    setNodes(root.descendants() as d3.HierarchyPointNode<TreeNode>[]);
    setLinks(root.links() as d3.HierarchyPointLink<TreeNode>[]);
  }, [data]);

  return (
    <div className="relative w-full h-[500px] border">
      {/* LINKS */}
      {links.map((link, i) => (
        <svg
          key={i}
          className="absolute left-0 top-0 w-full h-full pointer-events-none"
        >
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
    style={{
      position: "absolute",
      left: node.y + offset.x,
      top: node.x + offset.y,
      transform: "translate(-50%, -50%)",
    }}
  >
    <Node name={node.data.name} /> {/* pass the whole node */}
    
    <div className="flex justify-between mt-1">
      <button
        className="text-black font-bold px-1"
        onClick={e => {
          e.stopPropagation();
          const newChildName = prompt("Enter child node name:");
          if (!newChildName) return;
          if (!node.data.children) node.data.children = [];
          node.data.children.push({ name: newChildName });
          setTreeData({ ...data });
        }}
      >
        +
      </button>
      <button
        className="text-black font-bold px-1"
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
        {node.data.children ? "▼" : "▶"}
      </button>
    </div>
  </div>
))}
    </div>
  );
}