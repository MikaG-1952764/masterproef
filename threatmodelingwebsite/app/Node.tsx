// Node.tsx
import { TreeNode } from "./TreeVisualizer"; // import type if needed

export function Node({ node }: { node: d3.HierarchyPointNode<TreeNode> }) {
  return (
    <div className="bg-blue-300 rounded-full border border-blue-800 px-2 max-w-32 text-center">
      {node.data.name}
    </div>
  );
}
