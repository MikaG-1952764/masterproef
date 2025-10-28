import { TreeNode } from ".././TreeVisualizer";

/**
 * Haal alle laatste rode ('unfortunate') nodes op uit de boomstructuur.
 */
export function getLastRedNodes(node: TreeNode): TreeNode[] {
  const result: TreeNode[] = [];

  function traverse(current: TreeNode | null | undefined) {
    if (!current) return; // safety check

    const hasChildren = Array.isArray(current.children) && current.children.length > 0;

    // red leaf
    if (current.level === "unfortunate" && !hasChildren) {
      result.push(current);
    }

    // recurse through children
    if (Array.isArray(current.children)) {
      current.children.forEach(child => traverse(child));
    }
  }

  traverse(node);
  console.log(result);
  return result;
}

