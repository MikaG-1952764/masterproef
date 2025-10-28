import { TreeNode } from ".././TreeVisualizer";
import { GoShield, GoShieldCheck } from "react-icons/go";

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

export function getLastGreenNodesToCheck(node: TreeNode): TreeNode[] {
  const result: TreeNode[] = [];

  function traverse(current: TreeNode | null | undefined) {
    if (!current) return; // safety check

    const hasChildren = Array.isArray(current.children) && current.children.length > 0;

    // red leaf
    if (current.level === "fortunate" && !hasChildren && current.status==GoShield) {
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

export function getLastGreenNodesFinished(node: TreeNode): TreeNode[] {
  const result: TreeNode[] = [];

  function traverse(current: TreeNode | null | undefined) {
    if (!current) return; // safety check

    const hasChildren = Array.isArray(current.children) && current.children.length > 0;

    // red leaf
    if (current.level === "fortunate" && !hasChildren && current.status==GoShieldCheck) {
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

