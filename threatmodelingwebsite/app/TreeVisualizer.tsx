"use client";

import * as d3 from "d3";
import { useEffect, useState, useRef } from "react";
import { GoChevronDown, GoChevronUp, GoTrash } from "react-icons/go";
import { Node } from "./Node";
import { RiAddBoxLine } from "react-icons/ri";
import IconSelectorButton from "./components/iconButton";
import { GoShield } from "react-icons/go";
import { IconType } from "react-icons";
import { BsDot } from "react-icons/bs";
import { getImmediateParent } from "./components/getParent";
import { isFortunate } from "./page";

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
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const [tooltip, setTooltip] = useState<{
    visible: boolean;
    x: number;
    y: number;
    parent: TreeNode | null;
  }>({ visible: false, x: 0, y: 0, parent: null });


  // Store refs for each node
  const nodeRefs = useRef<Map<TreeNode, HTMLDivElement>>(new Map());

  const isHighlighted = (node: TreeNode) =>
    highlightedNodes.includes(node);

  useEffect(() => {
    const root = d3.hierarchy<TreeNode>(data, d => d.children ?? undefined);
    const treeLayout = d3.tree<TreeNode>().nodeSize([300, 180]);
    treeLayout(root);

    root.descendants().forEach(d => {
      const tmp = d.x;
      d.x = d.y;
      d.y = tmp;
    });

    const containerWidth = window.innerWidth;

    const allX = root.descendants().map(d => d.y ?? 0);
    const allY = root.descendants().map(d => d.x ?? 0);
    const minX = Math.min(...allX);
    const minY = Math.min(...allY);

    let offsetX = containerWidth / 2 - 40;
    let offsetY = 60 - minY;

    if (minX + offsetX < 20) offsetX += 30 - (minX + offsetX);

    setOffset({ x: offsetX, y: offsetY });
    setNodes(root.descendants() as d3.HierarchyPointNode<TreeNode>[]);
    setLinks(root.links() as d3.HierarchyPointLink<TreeNode>[]);
  }, [data]);

  const linkGen = d3
    .linkVertical<d3.HierarchyPointLink<TreeNode>, d3.HierarchyPointNode<TreeNode>>()
    .x(d => d.y + offset.x)
    .y(d => d.x + offset.y);

  // Scroll to current highlighted node when it changes
  useEffect(() => {
    if (currentNode && nodeRefs.current.has(currentNode)) {
      nodeRefs.current.get(currentNode)?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [currentNode]);

  const OFFSET_X = 12;
  const OFFSET_Y = 12;

  function showParentsAtMouse(e: React.MouseEvent, node: TreeNode) {
      if (!data) return;
      const parent = getImmediateParent(node, data!);
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
    <main>
      <div className="relative w-full h-full">
        {/* LINKS */}
        <svg className="relative left-28 top-14 overflow-visible">
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
            ref={el => {
              if (el) nodeRefs.current.set(node.data, el);
            }}
            className={`group cursor-pointer transition-all duration-200 hover:ring-2 hover:ring-blue-500 hover:bg-blue-100 rounded-md ${
              isHighlighted(node.data)
                ? "ring-2 ring-orange-300 bg-orange-100"
                : ""
            } ${
              currentNode === node.data ? "ring-4 ring-red-400" : ""
            }`}
            style={{
              position: "absolute",
              left: node.y + offset.x,
              top: node.x + offset.y,
            }}
            onMouseEnter={e => showParentsAtMouse(e, node.data)}
            onMouseMove={e => moveParentsAtMouse(e)}
            onMouseLeave={hideParents}
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
                <IconSelectorButton treeNode={node.data} setTreeData={setTreeData} data={data}/>
              </div>
            </div>

            <Node name={node.data.name} level={node.data.level} />

            <div className="flex justify-between mt-1">
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
                  <p className="text-black">{<div className="flex flex-row -space-x-4"><BsDot size={30}/><BsDot size={30}/></div>}</p>}
                {node.data._children?.length===3 &&
                  <p className="text-black">{<div className="flex flex-row -space-x-4"><BsDot size={30}/><BsDot size={30}/><BsDot size={30}/></div>}</p>}
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
        ))}
        {tooltip.visible && tooltip.parent && (
          <div
            className={`fixed z-50 border p-2 shadow rounded max-w-xs text-sm ${
              isFortunate(tooltip.parent) ? "bg-green-200" : "bg-red-200"
            }`}
            style={{
              left: tooltip.x,
              top: tooltip.y,
              pointerEvents: "none",
            }}
          >
            <div className="py-0.5 font-semibold text-black">
              {tooltip.parent ? tooltip.parent.name : "No parent"}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
